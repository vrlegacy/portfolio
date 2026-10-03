import { IProject, IExperience } from '@/types';

export const GENERAL_INFO = {
    name: 'Vishwas Rudramurthy',
    title: 'FullStack and AI Developer',
    headline: 'FullStack and AI Developer building scalable web applications, robust APIs, and intelligent AI workflows.',
    about: 'I am a passionate FullStack and AI developer with strong expertise in Python, FastAPI, React, Next.js, and AI workflow automation. I specialize in building end-to-end web platforms, orchestrating multi-agent LLM workflows (n8n, Gemini, Ollama/Gemma), and delivering clean, maintainable backend architectures.',
    email: 'vishwasrudramurthy.26@gmail.com',
    location: 'Bengaluru, India',
    github: 'https://github.com/vrlegacy',
    linkedin: 'https://www.linkedin.com/in/vr26/',
    resumePdf: '/resume.pdf',
    web3formsAccessKey: '901eaa6f-86af-4742-a295-650d772a4455',
};

export const SOCIAL_LINKS = [
    { name: 'GitHub', url: 'https://github.com/vrlegacy' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vr26/' },
    { name: 'Email', url: `mailto:${GENERAL_INFO.email}` },
];

export const STATS = [
    { label: 'Years Experience', value: '1+' },
    { label: 'Projects Built', value: '7+' },
    { label: 'AI Workflows', value: '15+' },
    { label: 'GitHub Repos', value: '25+' },
];

export const SKILL_CATEGORIES = [
    {
        title: 'Backend & APIs',
        skills: ['Python', 'FastAPI', 'Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'PostgreSQL', 'MongoDB']
    },
    {
        title: 'AI & Automation',
        skills: ['Google Gemini API', 'Ollama / Gemma', 'n8n Workflows', 'LiveKit WebRTC', 'Sarvam AI', 'OCR Processing', 'LangChain', 'Natural NLP']
    },
    {
        title: 'Frontend & UI',
        skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Radix UI', 'Redux', 'HTML5/CSS3']
    },
    {
        title: 'Cloud & Tools',
        skills: ['Git & GitHub', 'Docker', 'Supabase', 'AWS', 'Cloudinary', 'Postman', 'Linux', 'Vite']
    }
];

export const PROJECTS: IProject[] = [
    {
        title: 'TalentPulse AI',
        slug: 'talentpulse-ai',
        year: 2026,
        summary: 'An AI-powered recruitment platform that conducts live voice interviews and ranks candidates.',
        type: 'AI recruitment platform',
        status: 'completed',
        highlight: 'Voice interview + AI evaluation',
        featured: true,
        description: `
      TalentPulse AI is an automated recruitment intelligence platform designed to streamline high-volume hiring. It conducts real-time voice interviews using LiveKit WebRTC streaming and Sarvam AI voice synthesis. The system evaluates candidate responses on technical accuracy, communication fluency, and problem-solving readiness, outputting automated candidate scores and actionable recruitment reports.
      <br/><br/>
      <strong>Core Features:</strong>
      <ul>
        <li><strong>Interactive Voice Interviews:</strong> Real-time audio streaming powered by LiveKit and Sarvam AI voice synthesis.</li>
        <li><strong>Automated AI Evaluation:</strong> Deep scoring of candidate responses against custom job rubrics using Gemini LLMs.</li>
        <li><strong>Recruiter Dashboard:</strong> Comprehensive analytics view displaying candidate rankings, transcribing audio, and exporting readiness summaries.</li>
      </ul>
      `,
        role: `
      <strong>FullStack and AI Developer</strong><br/>
      Architected the FastAPI voice streaming backend, integrated LiveKit WebRTC rooms with Sarvam AI API endpoints, and built candidate evaluation ranking workflows.
      `,
        techStack: ['FastAPI', 'React', 'LiveKit', 'Sarvam AI', 'n8n', 'Supabase', 'Python'],
        thumbnail: '/projects/thumbnail/finocr.png',
        liveUrl: 'https://talentpulse-ai.example.com',
        sourceCode: 'https://github.com/vrlegacy/talentpulse-ai',
    },
    {
        title: 'TriGo Trip Planner',
        slug: 'trigo-trip-planner',
        year: 2026,
        summary: 'AI-powered conversational travel planner using n8n, Gemini models, and location APIs.',
        type: 'AI travel planner',
        status: 'completed',
        highlight: 'n8n + Gemini + APIs',
        featured: true,
        description: `
      TriGo Trip Planner is an interactive AI travel assistant that generates personalized multi-day travel itineraries. Powered by n8n multi-agent workflows, it connects Google Gemini and Gemma models with OpenTripMap for local point-of-interest discovery and OpenRouteService for distance/travel time calculations.
      <br/><br/>
      <strong>Core Features:</strong>
      <ul>
        <li><strong>Conversational Travel AI:</strong> Multi-turn chat assistant with contextual session memory.</li>
        <li><strong>Geo API Integration:</strong> Real-time integration with OpenTripMap and OpenRouteService.</li>
        <li><strong>Structured Itineraries:</strong> Standardized JSON schedules featuring daily timelines and estimated budgets.</li>
      </ul>
      `,
        role: `
      <strong>AI & FullStack Developer</strong><br/>
      Constructed multi-step n8n automation workflows, engineered structured Gemini prompts, and integrated geo-location REST APIs.
      `,
        techStack: ['n8n', 'Google Gemini', 'Gemma', 'OpenTripMap', 'OpenRouteService', 'TypeScript', 'REST API'],
        thumbnail: '/projects/thumbnail/trigo.png',
        liveUrl: 'https://vishwas-n8n-frontend.slicearrow.com/',
        sourceCode: 'https://github.com/vrlegacy/trigo-travel-planenr',
    },
    {
        title: 'Civix',
        slug: 'civix',
        year: 2025,
        summary: 'Full-stack digital civic engagement platform bridging citizens, volunteers, and local authorities.',
        type: 'Civic issue platform',
        status: 'completed',
        highlight: 'Full-stack MERN-style project',
        featured: true,
        description: `
      Civix is a civic engagement system developed under the Infosys Springboard internship. It enables citizens to report local infrastructure complaints with geolocation tags and photos, initiate digital petitions, and participate in community polls. Includes real-time NLP sentiment analysis on citizen feedback.
      <br/><br/>
      <strong>Core Features:</strong>
      <ul>
        <li><strong>Role-Based Access:</strong> Portals for Citizens, Volunteers, and Municipal Admins with JWT authorization.</li>
        <li><strong>Interactive Mapping:</strong> OpenStreetMap coordinates selection and Cloudinary media upload.</li>
        <li><strong>Petitions & Polls:</strong> Digital signature progress bars and geographic polls with live visual charts.</li>
        <li><strong>NLP Sentiment Analysis:</strong> Automatic feedback sentiment grading via Node natural library.</li>
      </ul>
      `,
        role: `
      <strong>Team Lead & FullStack Developer</strong><br/>
      Led a 6-developer team under Infosys Springboard. Designed Express/MongoDB REST API, JWT auth, OpenStreetMap mapping, and Natural NLP sentiment analysis.
      `,
        techStack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'OpenStreetMap', 'Natural NLP'],
        thumbnail: '/projects/images/civix-home.png',
        liveUrl: 'https://civix-zeta.vercel.app/',
        sourceCode: 'https://github.com/vrlegacy/civix-frontend',
        video: 'https://drive.google.com/file/d/1uhYGms1CHXoL4E4Js9MHp-OCbBMd6e3g/preview',
    },
    {
        title: 'GitHub Repo Explainer',
        slug: 'github-repo-explainer',
        year: 2026,
        summary: 'AI automation tool that parses GitHub repositories and generates interactive codebase summaries.',
        type: 'AI automation',
        status: 'completed',
        highlight: 'GitHub API + AI summary',
        featured: true,
        description: `
      GitHub Repo Explainer automates codebase documentation by parsing public and private GitHub repositories. It fetches directory trees, code modules, and commit histories via GitHub REST API, passing context to Google Gemini to produce clean architectural summaries, API overviews, and file breakdown explanations.
      <br/><br/>
      <strong>Core Features:</strong>
      <ul>
        <li><strong>Repository Parsing:</strong> Automated extraction of file hierarchies, READMEs, and key entry points.</li>
        <li><strong>AI Architecture Generation:</strong> Structured codebase summaries powered by Gemini API.</li>
        <li><strong>Interactive Code Walkthrough:</strong> Web interface for exploring code structures and module responsibilities.</li>
      </ul>
      `,
        role: `
      <strong>FullStack Developer</strong><br/>
      Developed FastAPI repository ingestion backend, token-aware chunking pipeline, and responsive React frontend interface.
      `,
        techStack: ['Python', 'FastAPI', 'Gemini API', 'GitHub API', 'React', 'TypeScript', 'Tailwind CSS'],
        thumbnail: '/projects/thumbnail/finocr.png',
        liveUrl: 'https://github-explainer.example.com',
        sourceCode: 'https://github.com/vrlegacy/github-repo-explainer',
    },
    {
        title: 'Candidate Readiness Workflow',
        slug: 'candidate-readiness-workflow',
        year: 2026,
        summary: 'Resume and job description fit analyzer built with n8n, OCR parsing, and AI scoring.',
        type: 'Resume/JD analyzer',
        status: 'completed',
        highlight: 'n8n + OCR + AI',
        featured: false,
        description: `
      An automated document processing pipeline that parses uploaded PDF resumes, extracts candidate experience using OCR, and calculates candidate readiness scores against target job descriptions using Gemini LLM models.
      <br/><br/>
      <strong>Core Features:</strong>
      <ul>
        <li><strong>OCR Text Extraction:</strong> Automated PDF parsing and text extraction.</li>
        <li><strong>AI Skill Matching:</strong> Semantic comparison of resume experience against job requirements.</li>
        <li><strong>Instant Scorecard:</strong> Generates candidate match percentage, missing skills, and interview questions.</li>
      </ul>
      `,
        role: `
      <strong>AI Developer</strong><br/>
      Created n8n orchestration workflow, document OCR extractor, and Gemini prompt template scoring engine.
      `,
        techStack: ['n8n', 'Python', 'FastAPI', 'Tesseract OCR', 'Gemini API', 'Supabase'],
        thumbnail: '/projects/thumbnail/trigo.png',
        liveUrl: 'https://readiness-workflow.example.com',
        sourceCode: 'https://github.com/vrlegacy/candidate-readiness-workflow',
    },
    {
        title: 'FinOCR',
        slug: 'fin-ocr',
        year: 2026,
        summary: 'Financial document processing & spend analytics application using local Gemma & Gemini OCR.',
        type: 'Financial OCR Platform',
        status: 'completed',
        highlight: 'Local Gemma + Gemini OCR',
        featured: true,
        description: `
      FinOCR is a financial intelligence application that automates receipt and invoice OCR, expense extraction, and spending analytics. Built with a React/Vite frontend and FastAPI backend, it leverages local Gemma models on Ollama alongside Gemini API for OCR text extraction, Auth0 for auth, and Supabase for cloud document storage.
      <br/><br/>
      <strong>Core Features:</strong>
      <ul>
        <li><strong>Intelligent OCR Scanner:</strong> Upload receipt and invoice images/PDFs for real-time text parsing.</li>
        <li><strong>Spend Analytics:</strong> Visual dashboard with daily/monthly spend charts and spending trend analytics.</li>
        <li><strong>Expense Management:</strong> Complete CRUD workflows for auditing transactions and scanning histories.</li>
      </ul>
      `,
        role: `
      <strong>FullStack Developer</strong><br/>
      Engineered FastAPI REST backend API with Supabase storage, local Gemma model inference on Ollama, Auth0 auth, and Vite/React analytics dashboard.
      `,
        techStack: ['Python', 'FastAPI', 'Gemma (Ollama)', 'Gemini API', 'Auth0', 'Supabase', 'React.js', 'TypeScript', 'Vite', 'Tailwind CSS'],
        thumbnail: '/projects/thumbnail/finocr.png',
        liveUrl: 'https://fin-ocr-frontend.pages.dev/',
        sourceCode: 'https://github.com/vrlegacy/fin_ocr_frontend',
        sourceCodeBackend: 'https://github.com/vrlegacy/fin_ocr_backend',
    },
    {
        title: 'Diabetic Retinopathy Detection',
        slug: 'diabetic-retinopathy-detection',
        year: 2025,
        summary: 'Deep learning diagnostic tool automating severity grading of diabetic retinopathy from retinal fundus images.',
        type: 'Deep Learning Diagnostic',
        status: 'completed',
        highlight: 'CNN Grading + CLAHE',
        featured: false,
        description: `
      An advanced AI medical application engineered to automate detection and grading of diabetic retinopathy from retinal fundus images using Convolutional Neural Networks (CNN) and CLAHE image preprocessing algorithms.
      <br/><br/>
      <strong>Core Features:</strong>
      <ul>
        <li><strong>Severity Grading:</strong> CNN model trained to categorize DR severity stages.</li>
        <li><strong>Preprocessing Pipeline:</strong> Custom CLAHE image contrast enhancement and noise reduction.</li>
        <li><strong>Diagnostic Web Portal:</strong> Clean Flask web application for uploading fundus images and viewing predictions.</li>
      </ul>
      `,
        role: `
      <strong>AI & FullStack Developer</strong><br/>
      Designed CNN model architectures, built OpenCV CLAHE preprocessing pipeline, and developed Flask web inference API.
      `,
        techStack: ['Python', 'Flask', 'Deep Learning', 'CNN', 'CLAHE', 'OpenCV', 'Pandas', 'NumPy'],
        thumbnail: '/projects/thumbnail/resume-roaster.jpg',
        sourceCode: 'https://github.com/vrlegacy/diabetic-detection-system',
    },
];

export const MY_EXPERIENCE: IExperience[] = [
    {
        id: 'exp-1',
        title: 'Full Stack Developer Intern',
        company: 'Sirpi Products and Services Pvt. Ltd.',
        location: 'Bengaluru, India (On-site)',
        duration: 'Apr 2026 - Present',
        period: 'Apr 2026 - Present',
        description: 'Engineered high-performance backend APIs, Python services, and responsive React frontend components for core company software products.',
        highlights: [
            'Architecting scalable REST APIs and asynchronous backend microservices using Python and FastAPI.',
            'Developing interactive React user interface components with TypeScript and Tailwind CSS.',
            'Optimizing database queries, caching strategies, and third-party service integration pipelines.'
        ],
        skills: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS']
    },
    {
        id: 'exp-2',
        title: 'Full Stack Intern',
        company: 'Infosys Springboard',
        location: 'Remote',
        duration: 'Aug 2025 - Dec 2025',
        period: 'Aug 2025 - Dec 2025',
        description: 'Led a team of 6 developers in architecting and delivering Civix, a digital civic engagement web platform.',
        highlights: [
            'Designed secure Node.js/Express REST backend with JWT authentication and pending user authorization queues.',
            'Integrated OpenStreetMap geolocation API, Cloudinary media pipelines, and Natural NLP sentiment analysis.',
            'Managed GitHub team branching strategies, sprint task allocation, and daily code reviews.'
        ],
        skills: ['Node.js', 'Express.js', 'MongoDB', 'React', 'TypeScript', 'Natural NLP', 'Git']
    }
];
