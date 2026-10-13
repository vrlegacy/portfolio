'use client';

export default function About() {
  return (
    <section id="about">
      <h2 className="sh">About Me</h2>
      <div className="prose">
        <p>
          I am a passionate FullStack and AI developer with strong expertise in Python, FastAPI, React, Next.js, and AI workflow automation. I specialize in building end-to-end web platforms, orchestrating multi-agent LLM workflows (n8n, Gemini, Ollama/Gemma), and delivering clean, maintainable backend architectures.
        </p>
        <p>
          My development methodology focuses on clean architecture, minimal dependencies, robust API contracts, and high computational efficiency. Whether building high-throughput FastAPI microservices, engineering real-time WebRTC audio rooms for AI interviews, or designing intuitive React interfaces, I prioritize maintainability and user impact.
        </p>
      </div>
      <div className="phil">
        <h3>Engineering Philosophy</h3>
        <ul>
          <li>
            <b>Robust REST APIs.</b> <span>FastAPI &amp; Express endpoints with type safety and schema validation.</span>
          </li>
          <li>
            <b>AI Workflow Automation.</b> <span>Multi-agent LLMs, n8n pipelines, LiveKit audio, and OCR processing.</span>
          </li>
          <li>
            <b>Modern Frontend UI.</b> <span>React &amp; Next.js applications with Tailwind CSS and Radix primitives.</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
