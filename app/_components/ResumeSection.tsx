'use client';

export default function ResumeSection() {
  const handleOpenResumeSheet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-resume-sheet'));
  };

  return (
    <section id="resume">
      <h2 className="sh">Curriculum Vitae</h2>
      <p className="lead" style={{ margin: 0, color: 'var(--fg2)' }}>
        Detailed background covering FullStack engineering, Python &amp; FastAPI API design, LLM workflow orchestration, and project impact highlights.
      </p>
      <ul className="caps">
        <li>FullStack Architecture (React / Python)</li>
        <li>AI Voice Streaming (LiveKit / Sarvam)</li>
        <li>Multi-Agent Workflows (n8n / Gemini)</li>
        <li>Team Leadership &amp; Agile Sprints</li>
      </ul>
      <div className="actions" style={{ marginTop: '22px' }}>
        <a
          className="btn btn-primary"
          href="/resume.pdf"
          download="Vishwas_Rudramurthy_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="ic" aria-hidden="true">
            <use href="#i-download" />
          </svg>
          Download Resume PDF
        </a>
      </div>
    </section>
  );
}
