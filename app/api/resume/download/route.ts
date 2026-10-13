import { NextResponse } from 'next/server';
import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { PROJECTS, SKILL_CATEGORIES } from '@/lib/data';

const execFileAsync = promisify(execFile);

const FOCUS_ROLE_SUMMARIES: Record<string, string> = {
  fullstack:
    'Full-Stack Engineer building scalable web platforms with Python (FastAPI), React, and Next.js. Experienced in designing clean REST APIs, handling database migrations and optimization in PostgreSQL and MongoDB, and connecting modern UI components with multi-agent AI workflows.',
  frontend:
    'Frontend Engineer focused on building fast, responsive web applications with React, Next.js, and TypeScript. Skilled in crafting scalable design systems with Tailwind CSS and Radix primitives, managing complex client state, and optimizing rendering performance.',
  backend:
    'Backend Engineer specializing in Python microservices, FastAPI, and asynchronous backend architectures. Solid background in schema design and query optimization for PostgreSQL and MongoDB, securing APIs with OAuth2/JWT, and setting up background task processing.',
  ai:
    'AI Solutions Engineer working at the intersection of web apps and LLMs. Hands-on experience building multi-agent workflows (n8n, LangChain), integrating Google Gemini and Gemma models, and implementing real-time WebRTC audio streaming, RAG pipelines, and document OCR.',
};

const PROJECT_DETAILS_BULLETS: Record<string, string[]> = {
  'talentpulse-ai': [
    'Built live voice interview platform using LiveKit Agents and Sarvam AI voice synthesis over WebRTC.',
    'Implemented conversation state management to sequence questions, retain context, and handle session reconnections.',
    'Automated resume-based question generation, candidate email workflows, and LLM transcript scoring via n8n.',
    'Engineered asynchronous FastAPI outbox worker to guarantee reliable event delivery during network interruptions.',
    'Created recruiter analytics dashboard displaying candidate rankings, transcribed audio, and readiness reports.',
  ],
  'trigo-trip-planner': [
    'Constructed multi-step n8n automation workflows connecting Google Gemini and Gemma models.',
    'Integrated OpenTripMap for point-of-interest discovery and OpenRouteService for distance/duration calculations.',
    'Designed structured JSON itinerary engine generating multi-day travel timelines and budget estimates.',
    'Built interactive conversational React frontend interface featuring multi-turn chat session memory.',
    'Implemented API failover handlers and rate-limiting fallbacks across external geospatial and AI endpoints.',
  ],
  civix: [
    'Led team of 6 developers in architecting digital civic engagement platform bridging citizens and authorities.',
    'Designed Express.js & MongoDB REST API with JWT authentication, request validation, and role-based access.',
    'Integrated OpenStreetMap geolocation API for location tagging and Cloudinary for media storage.',
    'Implemented digital petitions, polls, and Natural NLP sentiment analysis on citizen feedback.',
    'Configured automated deployment workflows and continuous integration test suites.',
  ],
  'fin-ocr': [
    'Engineered FastAPI REST backend and React/Vite spend analytics dashboard with Supabase cloud storage.',
    'Integrated local Gemma models on Ollama alongside Gemini API for structured receipt text extraction.',
    'Designed PostgreSQL tables with SQLAlchemy relationships and cascading constraints for data integrity.',
    'Implemented Auth0 authentication, transaction auditing workflows, and spending analytics visualizations.',
    'Developed custom image contrast preprocessing routines to maximize OCR accuracy on low-quality receipts.',
  ],
  'github-repo-explainer': [
    'Developed automated codebase documentation tool parsing public and private GitHub repositories via GitHub REST API.',
    'Engineered token-aware code chunking pipeline in Python and FastAPI to format source files for LLM context limits.',
    'Integrated Google Gemini API to generate structured architectural overviews, API breakdowns, and file summaries.',
    'Built interactive React & Tailwind CSS frontend allowing developers to navigate codebase trees with AI insights.',
    'Implemented background async caching for parsed repository trees to optimize repeated AI requests.',
  ],
  'candidate-readiness-workflow': [
    'Constructed automated document processing pipeline parsing uploaded PDF resumes using OCR extraction.',
    'Integrated Gemini LLM scoring models to calculate candidate fit percentages against job descriptions.',
    'Automated interview question generation and missing skill recommendations via n8n workflows.',
    'Engineered Supabase cloud database schema to store candidate scorecards and recruiter evaluation histories.',
    'Designed responsive evaluation dashboard displaying visual fit metrics and recruiter summary reports.',
  ],
  'diabetic-retinopathy-detection': [
    'Developed deep learning diagnostic application automating severity grading of diabetic retinopathy from retinal fundus images.',
    'Built Convolutional Neural Network (CNN) architecture trained on fundus image datasets for multi-class classification.',
    'Applied CLAHE (Contrast Limited Adaptive Histogram Equalization) and OpenCV preprocessing to enhance microaneurysm visibility.',
    'Built lightweight Flask web application for medical professionals to upload fundus images and receive instant predictions.',
    'Evaluated model performance using ROC-AUC curves, confusion matrices, and cross-validation techniques.',
  ],
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { activeFocus = 'fullstack', selectedProjectSlugs = [], format = 'pdf' } = body;

    const summary = FOCUS_ROLE_SUMMARIES[activeFocus] || FOCUS_ROLE_SUMMARIES.fullstack;

    // Filter projects matching selected slugs
    const selectedProjects = PROJECTS.filter((p) => selectedProjectSlugs.includes(p.slug)).map((p) => ({
      title: p.title,
      tech: p.techStack.join(', '),
      link: p.sourceCode || p.liveUrl || '',
      bullets: PROJECT_DETAILS_BULLETS[p.slug] || [p.summary],
    }));

    const skills = SKILL_CATEGORIES.map((cat) => `<b>${cat.title}:</b> ${cat.skills.join(', ')}`);

    const inputData = {
      summary,
      skills,
      projects: selectedProjects.length > 0 ? selectedProjects : PROJECTS.slice(0, 4).map((p) => ({
        title: p.title,
        tech: p.techStack.join(', '),
        link: p.sourceCode || p.liveUrl || '',
        bullets: PROJECT_DETAILS_BULLETS[p.slug] || [p.summary],
      })),
    };

    const tempId = Date.now();
    const inputPath = path.join(process.cwd(), `.next/tmp_input_${tempId}.json`);
    const ext = format === 'tex' ? 'tex' : 'pdf';
    const outputPath = path.join(process.cwd(), `.next/tmp_output_${tempId}.${ext}`);

    fs.writeFileSync(inputPath, JSON.stringify(inputData), 'utf-8');

    const pythonBin = path.join(process.cwd(), '.venv/bin/python3');
    const scriptPath = path.join(process.cwd(), 'scripts/generate_custom_resume.py');

    await execFileAsync(pythonBin, [scriptPath, '--input', inputPath, '--output', outputPath, '--format', format]);

    const fileBuffer = fs.readFileSync(outputPath);

    // Clean up temporary files
    try {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    } catch {}

    const contentType = format === 'tex' ? 'application/x-tex' : 'application/pdf';
    const filename = format === 'tex' ? 'Vishwas_Rudramurthy_Resume.tex' : 'Vishwas_Rudramurthy_Resume.pdf';

    return new Response(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error generating custom resume:', error);
    return NextResponse.json({ error: 'Failed to generate resume' }, { status: 500 });
  }
}
