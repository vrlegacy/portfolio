'use client';

import Link from 'next/link';
import { PROJECTS } from '@/lib/data';

export default function FeaturedProjects() {
  const featuredProjects = PROJECTS.filter((p) => p.featured);

  return (
    <section id="projects">
      <h2 className="sh">Featured Projects</h2>
      {featuredProjects.map((p) => (
        <article className="entry proj" key={p.slug}>
          <div className="when">{p.highlight || p.type}</div>
          <div className="lines">
            <div className="title">
              <h3>{p.title}</h3>
              <span className="type">{p.type}</span>
            </div>
            <p>{p.summary}</p>
            <p className="tech" style={{ margin: 0 }}>
              {p.techStack.join(' · ')}
            </p>
            <div className="actions" style={{ marginTop: '6px' }}>
              {p.liveUrl && (
                <a
                  className="btn btn-primary btn-sm"
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-up-right" />
                  </svg>
                </a>
              )}
              {p.sourceCode && (
                <a
                  className="btn btn-glass btn-sm"
                  href={p.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-up-right" />
                  </svg>
                </a>
              )}
              <Link className="btn btn-glass btn-sm" href={`/projects/${p.slug}`}>
                Case Study
                <svg className="ic" aria-hidden="true">
                  <use href="#i-up-right" />
                </svg>
              </Link>
            </div>
          </div>
        </article>
      ))}

      <div className="actions more">
        <Link className="btn btn-glass btn-sm" href="/projects">
          View All Projects
          <svg className="ic" aria-hidden="true">
            <use href="#i-up-right" />
          </svg>
        </Link>
      </div>

      <div className="matrix">
        <h2 className="sh">Case Studies &amp; Highlights</h2>
        <p className="lead" style={{ margin: '0 0 18px', color: 'var(--fg2)' }}>
          A quick reference matrix of key projects, application types, and core engineering highlights.
        </p>
        <div className="mhead" aria-hidden="true">
          <span>Project</span>
          <span>Type</span>
          <span>Highlight</span>
          <span></span>
        </div>
        {PROJECTS.map((project) => (
          <Link
            key={project.slug}
            className="mrow"
            href={`/projects/${project.slug}`}
          >
            <span className="nm">{project.title}</span>
            <span className="ty">{project.type}</span>
            <span className="hl">{project.highlight}</span>
            <svg className="ic" aria-hidden="true">
              <use href="#i-chevron" />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  );
}
