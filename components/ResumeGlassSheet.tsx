'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { GENERAL_INFO, MY_EXPERIENCE, PROJECTS, SKILL_CATEGORIES } from '@/lib/data';

type FocusRole = 'fullstack' | 'frontend' | 'backend' | 'ai';

const FOCUS_ROLES: { id: FocusRole; label: string }[] = [
  { id: 'fullstack', label: 'FullStack Developer' },
  { id: 'frontend', label: 'Frontend Engineer' },
  { id: 'backend', label: 'Backend Engineer' },
  { id: 'ai', label: 'AI / ML Engineer' },
];

const FOCUS_ROLE_SUMMARIES: Record<FocusRole, string> = {
  fullstack:
    'Full-Stack Engineer building scalable web platforms with Python (FastAPI), React, and Next.js. Experienced in designing clean REST APIs, handling database migrations and optimization in PostgreSQL and MongoDB, and connecting modern UI components with multi-agent AI workflows. Driven by a passion for solving complex problems, learning new stack patterns quickly, and building reliable end-to-end software.',
  frontend:
    'Frontend Engineer focused on building fast, responsive web applications with React, Next.js, and TypeScript. Skilled in crafting scalable design systems with Tailwind CSS and Radix primitives, managing complex client state, and optimizing rendering performance. Highly adaptable with a strong drive to continuously refine UI/UX details and adopt emerging web standards.',
  backend:
    'Backend Engineer specializing in Python microservices, FastAPI, and asynchronous backend architectures. Solid background in schema design and query optimization for PostgreSQL and MongoDB, securing APIs with OAuth2/JWT, and setting up background task processing. A quick learner focused on writing clean, maintainable code and taking complete ownership of backend systems.',
  ai:
    'AI Solutions Engineer working at the intersection of web apps and LLMs. Hands-on experience building multi-agent workflows (n8n, LangChain), integrating Google Gemini and Gemma models, and implementing real-time WebRTC audio streaming, RAG pipelines, and document OCR. Curiosity-driven developer who picks up new AI frameworks rapidly to turn practical tools into production reality.',
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

const ALL_PROJECT_SLUGS = PROJECTS.map((p) => p.slug);

const loadHtml2Pdf = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if ((window as any).html2pdf) {
      return resolve((window as any).html2pdf);
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => resolve((window as any).html2pdf);
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

import { useRouter } from 'next/navigation';

interface ResumeGlassSheetProps {
  initialOpen?: boolean;
  isStandalonePage?: boolean;
}

export default function ResumeGlassSheet({ initialOpen = false, isStandalonePage = false }: ResumeGlassSheetProps) {
  type ResumeFormat = 'compact' | 'detailed';

  const [isOpen, setIsOpen] = useState(initialOpen);
  const [activeFocus, setActiveFocus] = useState<FocusRole>('fullstack');
  const [resumeFormat, setResumeFormat] = useState<ResumeFormat>('compact');
  const [selectedProjectSlugs, setSelectedProjectSlugs] = useState<string[]>(ALL_PROJECT_SLUGS);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-resume-sheet', handleOpen);
    return () => window.removeEventListener('open-resume-sheet', handleOpen);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProjectsDropdownOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedProjects = useMemo(() => {
    return selectedProjectSlugs
      .map((slug) => PROJECTS.find((p) => p.slug === slug))
      .filter((p): p is typeof PROJECTS[0] => Boolean(p));
  }, [selectedProjectSlugs]);

  const toggleProjectSlug = (slug: string) => {
    setSelectedProjectSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const moveProjectUp = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProjectSlugs((prev) => {
      const idx = prev.indexOf(slug);
      if (idx <= 0) return prev;
      const next = [...prev];
      const temp = next[idx];
      next[idx] = next[idx - 1];
      next[idx - 1] = temp;
      return next;
    });
  };

  const moveProjectDown = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProjectSlugs((prev) => {
      const idx = prev.indexOf(slug);
      if (idx < 0 || idx >= prev.length - 1) return prev;
      const next = [...prev];
      const temp = next[idx];
      next[idx] = next[idx + 1];
      next[idx + 1] = temp;
      return next;
    });
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/interactive`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        window.dispatchEvent(
          new CustomEvent('island-notify', { detail: 'Interactive Resume Link Copied' })
        );
      });
    }
  };

  // Instant Client-Side PDF Download matching exact preview font sizes & layout
  const handleDownloadCustomPDF = async () => {
    setIsDownloadingPdf(true);
    try {
      const html2pdf = await loadHtml2Pdf();
      const element = document.getElementById('paper-resume-document');
      if (!element) return;

      const filename =
        resumeFormat === 'compact'
          ? 'Vishwas_Rudramurthy_Resume_Compact.pdf'
          : 'Vishwas_Rudramurthy_Resume_Detailed.pdf';

      const opt = {
        margin: 0,
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };

      await html2pdf().set(opt).from(element).save();

      window.dispatchEvent(
        new CustomEvent('island-notify', { detail: 'Resume PDF Downloaded!' })
      );
    } catch (err) {
      console.error(err);
      window.dispatchEvent(
        new CustomEvent('island-notify', { detail: 'PDF Download Failed' })
      );
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // Instant Copy LaTeX Code
  const handleCopyLaTeXCode = () => {
    const summary = FOCUS_ROLE_SUMMARIES[activeFocus];
    const skillsFormatted = SKILL_CATEGORIES.map(
      (cat) => `\\textbf{${cat.title}:} ${cat.skills.join(', ')}`
    ).join('\n\n');

    const isCompact = resumeFormat === 'compact';
    const projectsTex = selectedProjects
      .map((p) => {
        const rawBullets = PROJECT_DETAILS_BULLETS[p.slug] || [p.summary];
        const bulletLimit = isCompact
          ? selectedProjects.length > 5
            ? 2
            : selectedProjects.length > 3
            ? 2
            : 3
          : rawBullets.length;

        const bullets = rawBullets
          .slice(0, bulletLimit)
          .map((b) => `  \\item ${b}`)
          .join('\n');
        const titleEscaped = p.title.replace(/&/g, '\\&');
        const techEscaped = p.techStack.join(' · ').replace(/&/g, '\\&');
        const linksList = [];
        if (p.sourceCode) linksList.push(`\\href{${p.sourceCode}}{GitHub}`);
        if (p.liveUrl) linksList.push(`\\href{${p.liveUrl}}{Live Demo}`);
        const linkTex = linksList.join(' \\, | \\, ');
        return `\\project{${titleEscaped}}{${linkTex}}{${techEscaped}}
\\begin{itemize}
${bullets}
\\end{itemize}`;
      })
      .join('\n\n');

    const latexCode = `\\documentclass[a4paper,10pt]{article}

\\usepackage[left=0.65in,right=0.65in,top=0.5in,bottom=0.5in]{geometry}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage[scaled=0.96]{helvet}
\\renewcommand{\\familydefault}{\\sfdefault}
\\usepackage{microtype}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{needspace}
\\usepackage[hidelinks]{hyperref}

\\input{glyphtounicode}
\\pdfgentounicode=1

\\pagestyle{empty}
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{0pt}
\\urlstyle{same}
\\raggedright

\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\titlerule]
\\titlespacing*{\\section}{0pt}{8pt}{4pt}

\\setlist[itemize]{
  leftmargin=1.15em,
  topsep=2pt,
  itemsep=2pt,
  parsep=0pt,
  partopsep=0pt,
  label=\\textbullet
}

\\newcommand{\\experience}[4]{%
  \\needspace{5\\baselineskip}
  \\textbf{#1}\\hfill #2\\\\
  \\textit{#3}\\hfill \\textit{#4}\\par
}

\\newcommand{\\project}[3]{%
  \\needspace{5\\baselineskip}
  \\textbf{#1}\\hfill #2\\\\
  {\\small\\textit{#3}}\\par
}

\\begin{document}

\\begin{center}
  {\\Huge \\textbf{Vishwas Rudramurthy}}\\\\ [3pt]
  {\\small Bengaluru, India \\, | \\, \\href{mailto:vishwasrudramurthy.26@gmail.com}{vishwasrudramurthy.26@gmail.com} \\, | \\, \\href{https://www.linkedin.com/in/vr26/}{linkedin.com/in/vr26} \\, | \\, \\href{https://github.com/vrlegacy}{github.com/vrlegacy} \\, | \\, \\href{https://buildwithvr.pages.dev}{buildwithvr.pages.dev}}
\\end{center}

\\section*{SUMMARY}
${summary}

\\section*{TECHNICAL SKILLS}
${skillsFormatted}

\\section*{EXPERIENCE}
\\experience{Full Stack Developer}{Apr 2026 -- Present}{Sirpi Products and Services Pvt. Ltd.}{Bengaluru, India}
\\begin{itemize}
  \\item Architecting scalable REST APIs and asynchronous backend microservices using Python and FastAPI.
  \\item Developing interactive React user interface components with TypeScript and Tailwind CSS.
  \\item Optimizing database queries, caching strategies, and third-party service integration pipelines.
\\end{itemize}

\\experience{Full Stack Intern}{Aug 2025 -- Dec 2025}{Infosys Springboard}{Remote}
\\begin{itemize}
  \\item Led a team of 6 developers in architecting and delivering Civix, a digital civic engagement web platform.
  \\item Designed secure Node.js/Express REST backend with JWT authentication and pending user authorization queues.
  \\item Integrated OpenStreetMap geolocation API, Cloudinary media pipelines, and Natural NLP sentiment analysis.
  \\item Managed GitHub team branching strategies, sprint task allocation, and daily code reviews.
\\end{itemize}

\\section*{PROJECTS}
${projectsTex}

\\section*{EDUCATION}
\\experience{Rajarajeshwari College of Engineering}{Sept 2022 -- June 2026}{B.E. in Artificial Intelligence and Machine Learning}{CGPA: 8.2/10}

\\end{document}
`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(latexCode).then(() => {
        window.dispatchEvent(
          new CustomEvent('island-notify', { detail: 'LaTeX Code Copied to Clipboard!' })
        );
      });
    } else {
      window.dispatchEvent(
        new CustomEvent('island-notify', { detail: 'LaTeX Code Copied to Clipboard!' })
      );
    }
  };

  if (!isOpen) return null;

  const onClose = () => {
    setIsOpen(false);
    if (isStandalonePage) {
      router.push('/');
    }
  };

  const isCompact = resumeFormat === 'compact';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#f4f4f7',
        color: '#111111',
        overflow: 'hidden',
      }}
    >
      {/* Top Header & Dropdown Filters Bar (Light Liquid Glass) */}
      <div
        style={{
          padding: '14px 28px',
          background: 'rgba(255, 255, 255, 0.85)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(28px) saturate(190%)',
          WebkitBackdropFilter: 'blur(28px) saturate(190%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          zIndex: 30,
        }}
      >
        {/* Title Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="isl-avatar" style={{ width: '34px', height: '34px', fontSize: '.75rem', fontWeight: 700, background: '#111111', color: '#ffffff' }}>
            VR
          </span>
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-.02em', margin: 0, color: '#111111' }}>
              Interactive Resume Builder
            </h2>
            <p style={{ fontSize: '.75rem', color: '#5f5f66', margin: 0 }}>
              A4 Real-Time Live Preview
            </p>
          </div>
        </div>

        {/* 3 Light Liquid Glass Filters (Role, Format, Projects with Reordering) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {/* Dropdown 1: Focus Role */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '.75rem', fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: '.05em' }}>
              ROLE:
            </label>
            <select
              value={activeFocus}
              onChange={(e) => setActiveFocus(e.target.value as FocusRole)}
              style={{
                padding: '8px 36px 8px 16px',
                borderRadius: '999px',
                background: 'rgba(0, 0, 0, 0.05)',
                color: '#111111',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                fontSize: '.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none',
                WebkitAppearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23111111' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 14px center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              {FOCUS_ROLES.map((r) => (
                <option key={r.id} value={r.id} style={{ background: '#ffffff', color: '#111111' }}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown 2: Format (Compact vs Detailed) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '.75rem', fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: '.05em' }}>
              FORMAT:
            </label>
            <select
              value={resumeFormat}
              onChange={(e) => setResumeFormat(e.target.value as ResumeFormat)}
              style={{
                padding: '8px 36px 8px 16px',
                borderRadius: '999px',
                background: 'rgba(0, 0, 0, 0.05)',
                color: '#111111',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                fontSize: '.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none',
                WebkitAppearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23111111' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 14px center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <option value="compact" style={{ background: '#ffffff', color: '#111111' }}>
                Compact (1-Page)
              </option>
              <option value="detailed" style={{ background: '#ffffff', color: '#111111' }}>
                Detailed (2-Page)
              </option>
            </select>
          </div>

          {/* Dropdown 3: Projects Multi-Select & Reorder */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }} ref={dropdownRef}>
            <label style={{ fontSize: '.75rem', fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: '.05em' }}>
              PROJECTS:
            </label>
            <button
              type="button"
              onClick={() => setIsProjectsDropdownOpen((prev) => !prev)}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                background: 'rgba(0, 0, 0, 0.05)',
                color: '#111111',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                fontSize: '.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                minWidth: '210px',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <span>
                {selectedProjectSlugs.length === PROJECTS.length
                  ? 'All 7 Projects Included'
                  : `${selectedProjectSlugs.length} Selected`}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>

            {/* Dropdown Popup Content (Light Theme Popover) */}
            {isProjectsDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '10px',
                  width: '340px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  borderRadius: '18px',
                  background: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
                  padding: '14px',
                  zIndex: 80,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', marginBottom: '8px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  <div>
                    <span style={{ fontSize: '.75rem', fontWeight: 700, color: '#111111', textTransform: 'uppercase', display: 'block' }}>
                      PROJECTS ({selectedProjectSlugs.length}/{PROJECTS.length})
                    </span>
                    <span style={{ fontSize: '.68rem', color: '#6e6e73' }}>Use ▲ ▼ to reorder projects</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedProjectSlugs(ALL_PROJECT_SLUGS)}
                      style={{ background: 'none', border: 'none', fontSize: '.75rem', color: '#111111', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Select All
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProjectSlugs([])}
                      style={{ background: 'none', border: 'none', fontSize: '.75rem', color: '#6e6e73', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {PROJECTS.map((proj) => {
                    const orderIndex = selectedProjectSlugs.indexOf(proj.slug);
                    const isSelected = orderIndex !== -1;
                    return (
                      <div
                        key={proj.slug}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '6px 10px',
                          borderRadius: '10px',
                          background: isSelected ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                          border: isSelected ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid transparent',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontSize: '.84rem',
                            color: '#111111',
                            cursor: 'pointer',
                            userSelect: 'none',
                            flex: 1,
                            overflow: 'hidden',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleProjectSlug(proj.slug)}
                            style={{ accentColor: '#111111', width: '16px', height: '16px', cursor: 'pointer', flexShrink: 0 }}
                          />
                          <span style={{ fontWeight: isSelected ? 600 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {proj.title}
                          </span>
                        </label>

                        {isSelected && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                            <span
                              style={{
                                fontSize: '.68rem',
                                fontWeight: 700,
                                background: 'rgba(0, 0, 0, 0.08)',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                color: '#111111',
                                marginRight: '2px',
                              }}
                            >
                              #{orderIndex + 1}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => moveProjectUp(proj.slug, e)}
                              disabled={orderIndex === 0}
                              title="Move Up in Resume"
                              style={{
                                background: 'rgba(0, 0, 0, 0.05)',
                                border: 'none',
                                color: orderIndex === 0 ? '#cccccc' : '#111111',
                                borderRadius: '4px',
                                width: '22px',
                                height: '22px',
                                cursor: orderIndex === 0 ? 'default' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '.68rem',
                              }}
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              onClick={(e) => moveProjectDown(proj.slug, e)}
                              disabled={orderIndex === selectedProjectSlugs.length - 1}
                              title="Move Down in Resume"
                              style={{
                                background: 'rgba(0, 0, 0, 0.05)',
                                border: 'none',
                                color: orderIndex === selectedProjectSlugs.length - 1 ? '#cccccc' : '#111111',
                                borderRadius: '4px',
                                width: '22px',
                                height: '22px',
                                cursor: orderIndex === selectedProjectSlugs.length - 1 ? 'default' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '.68rem',
                              }}
                            >
                              ▼
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            background: 'rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            color: '#111111',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          ✕
        </button>
      </div>

      {/* Main Workspace (Centered Scrollable Real-Time A4 Paper Document Preview) */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '36px 16px',
          background: '#eef0f4',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {/* A4 Paper Container */}
        <div
          id="paper-resume-document"
          style={{
            width: '210mm',
            minHeight: '297mm',
            background: '#ffffff',
            color: '#111111',
            padding: isCompact ? '12mm 16mm' : '16mm 18mm',
            borderRadius: '2px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06)',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: isCompact ? '8.5pt' : '9pt',
            lineHeight: isCompact ? 1.3 : 1.38,
            boxSizing: 'border-box',
            margin: '0 auto',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: isCompact ? '12px' : '16px', pageBreakInside: 'avoid', breakInside: 'avoid' }}>
            <h1 style={{ fontSize: isCompact ? '18pt' : '20pt', fontWeight: 'bold', margin: '0 0 4px 0', letterSpacing: '-0.02em', color: '#111111' }}>
              {GENERAL_INFO.name}
            </h1>
            <div style={{ fontSize: isCompact ? '8pt' : '8.5pt', color: '#333333' }}>
              {GENERAL_INFO.location} &nbsp;|&nbsp; {GENERAL_INFO.email} &nbsp;|&nbsp; linkedin.com/in/vr26 &nbsp;|&nbsp; github.com/vrlegacy &nbsp;|&nbsp; buildwithvr.pages.dev
            </div>
          </div>

          {/* SUMMARY */}
          <div style={{ marginBottom: isCompact ? '10px' : '14px', pageBreakInside: 'avoid', breakInside: 'avoid' }}>
            <h2 style={{ fontSize: isCompact ? '10pt' : '10.5pt', fontWeight: 'bold', borderBottom: '1.5px solid #111111', paddingBottom: '2px', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
              Summary
            </h2>
            <p style={{ margin: 0, fontSize: isCompact ? '8pt' : '8.5pt', lineHeight: isCompact ? '1.35' : '1.4', color: '#222222' }}>
              {FOCUS_ROLE_SUMMARIES[activeFocus]}
            </p>
          </div>

          {/* TECHNICAL SKILLS */}
          <div style={{ marginBottom: isCompact ? '10px' : '14px', pageBreakInside: 'avoid', breakInside: 'avoid' }}>
            <h2 style={{ fontSize: isCompact ? '10pt' : '10.5pt', fontWeight: 'bold', borderBottom: '1.5px solid #111111', paddingBottom: '2px', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
              Technical Skills
            </h2>
            <div style={{ fontSize: isCompact ? '8pt' : '8.5pt', lineHeight: isCompact ? '1.35' : '1.4' }}>
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.title} style={{ marginBottom: '2px' }}>
                  <strong>{cat.title}:</strong> {cat.skills.join(', ')}
                </div>
              ))}
            </div>
          </div>

          {/* EXPERIENCE */}
          <div style={{ marginBottom: isCompact ? '10px' : '14px', pageBreakInside: 'avoid', breakInside: 'avoid' }}>
            <h2 style={{ fontSize: isCompact ? '10pt' : '10.5pt', fontWeight: 'bold', borderBottom: '1.5px solid #111111', paddingBottom: '2px', margin: '0 0 6px 0', textTransform: 'uppercase' }}>
              Experience
            </h2>
            {MY_EXPERIENCE.map((exp) => {
              const highlights = isCompact ? exp.highlights.slice(0, 3) : exp.highlights;
              return (
                <div key={exp.id} style={{ marginBottom: isCompact ? '8px' : '12px', pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: isCompact ? '8.5pt' : '9pt' }}>
                    <span>{exp.title}</span>
                    <span>{exp.duration}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic', fontSize: isCompact ? '8pt' : '8.5pt', color: '#444444', marginBottom: '2px' }}>
                    <span>{exp.company}</span>
                    <span>{exp.location}</span>
                  </div>
                  <ul style={{ margin: '2px 0 0 14px', padding: 0, fontSize: isCompact ? '8pt' : '8.5pt' }}>
                    {highlights.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: '1.5px' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* PROJECTS (Dynamically rendered in custom user order) */}
          <div style={{ marginBottom: isCompact ? '10px' : '14px', pageBreakInside: 'avoid', breakInside: 'avoid' }}>
            <h2 style={{ fontSize: isCompact ? '10pt' : '10.5pt', fontWeight: 'bold', borderBottom: '1.5px solid #111111', paddingBottom: '2px', margin: '0 0 6px 0', textTransform: 'uppercase' }}>
              Projects ({selectedProjects.length} Selected)
            </h2>
            {selectedProjects.length === 0 ? (
              <p style={{ fontStyle: 'italic', color: '#666', fontSize: '8pt' }}>
                No projects selected. Use the top dropdown filter to select projects for your resume.
              </p>
            ) : (
              selectedProjects.map((proj) => {
                const rawBullets = PROJECT_DETAILS_BULLETS[proj.slug] || [proj.summary];
                const bulletLimit = isCompact
                  ? selectedProjects.length > 5
                    ? 2
                    : selectedProjects.length > 3
                    ? 2
                    : 3
                  : rawBullets.length;
                const bullets = rawBullets.slice(0, bulletLimit);

                return (
                  <div key={proj.slug} style={{ marginBottom: isCompact ? '7px' : '11px', pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: isCompact ? '8.5pt' : '9pt' }}>
                      <span>{proj.title}</span>
                      <div style={{ display: 'flex', gap: '6px', fontSize: isCompact ? '7.5pt' : '8pt', fontWeight: 'normal', color: '#0056b3' }}>
                        {proj.sourceCode && (
                          <a href={proj.sourceCode} target="_blank" rel="noreferrer" style={{ color: '#0056b3', textDecoration: 'none' }}>
                            GitHub
                          </a>
                        )}
                        {proj.sourceCode && proj.liveUrl && <span style={{ color: '#888888' }}>|</span>}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noreferrer" style={{ color: '#0056b3', textDecoration: 'none' }}>
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                    <div style={{ fontStyle: 'italic', fontSize: isCompact ? '7.5pt' : '8pt', color: '#555555', marginBottom: '2px' }}>
                      {proj.techStack.join(' · ')}
                    </div>
                    <ul style={{ margin: '2px 0 0 14px', padding: 0, fontSize: isCompact ? '8pt' : '8.5pt' }}>
                      {bullets.map((b, i) => (
                        <li key={i} style={{ marginBottom: '1.5px' }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                );
              })
            )}
          </div>

          {/* EDUCATION */}
          <div style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
            <h2 style={{ fontSize: isCompact ? '10pt' : '10.5pt', fontWeight: 'bold', borderBottom: '1.5px solid #111111', paddingBottom: '2px', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
              Education
            </h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: isCompact ? '8.5pt' : '9pt' }}>
              <span>Rajarajeshwari College of Engineering</span>
              <span>Sept 2022 – June 2026</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: isCompact ? '8pt' : '8.5pt', color: '#333333' }}>
              <span>B.E. in Artificial Intelligence and Machine Learning</span>
              <span><strong>CGPA: 8.2/10</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Actions Bar (Light Liquid Glass Theme) */}
      <div
        style={{
          padding: '16px 28px',
          background: 'rgba(255, 255, 255, 0.88)',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(28px) saturate(190%)',
          WebkitBackdropFilter: 'blur(28px) saturate(190%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          zIndex: 30,
        }}
      >
        <div style={{ fontSize: '.875rem', color: '#444446', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <strong style={{ color: '#111111' }}>A4 Format</strong>
          <span>·</span>
          <span>{selectedProjects.length} of {PROJECTS.length} Projects</span>
          <span>·</span>
          <span
            style={{
              background: isCompact ? 'rgba(37, 99, 235, 0.1)' : 'rgba(147, 51, 234, 0.1)',
              border: isCompact ? '1px solid rgba(37, 99, 235, 0.25)' : '1px solid rgba(147, 51, 234, 0.25)',
              color: isCompact ? '#1d4ed8' : '#7e22ce',
              padding: '2px 10px',
              borderRadius: '999px',
              fontSize: '.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '.04em',
            }}
          >
            {isCompact ? 'Compact (1-Page)' : 'Detailed (2-Page)'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-sm"
            onClick={handleCopyLink}
            title="Copy Shareable Resume Link"
            style={{
              background: 'rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.12)',
              color: '#111111',
            }}
          >
            <svg className="ic" aria-hidden="true" style={{ stroke: '#111111' }}>
              <use href="#i-copy" />
            </svg>
            Copy Link
          </button>

          <button
            type="button"
            className="btn btn-sm"
            onClick={handleCopyLaTeXCode}
            title="Copy Custom LaTeX Source Code"
            style={{
              background: 'rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.12)',
              color: '#111111',
            }}
          >
            <svg className="ic" aria-hidden="true" style={{ stroke: '#111111' }}>
              <use href="#i-code" />
            </svg>
            Copy LaTeX Code
          </button>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleDownloadCustomPDF}
            disabled={isDownloadingPdf}
            title="Instant Download Custom Resume PDF"
            style={{
              padding: '0 20px',
              minHeight: '38px',
              fontWeight: 700,
              background: '#111111',
              color: '#ffffff',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            <svg className="ic" aria-hidden="true" style={{ stroke: '#ffffff' }}>
              <use href="#i-download" />
            </svg>
            {isDownloadingPdf ? 'Generating PDF...' : 'Download Resume (PDF)'}
          </button>
        </div>
      </div>
    </div>
  );
}
