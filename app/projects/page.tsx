'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PROJECTS } from '@/lib/data';
import { ProjectStatus } from '@/types';
import Footer from '@/components/Footer';

export default function ProjectsPage() {
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'all'>('all');

  const filteredProjects =
    selectedStatus === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.status === selectedStatus);

  const counts = {
    all: PROJECTS.length,
    completed: PROJECTS.filter((p) => p.status === 'completed').length,
    ongoing: PROJECTS.filter((p) => p.status === 'ongoing').length,
    planning: PROJECTS.filter((p) => p.status === 'planning').length,
  };

  return (
    <main className="wrap">
      <section className="hero">
        <Link href="/" style={{ fontSize: '.875rem', textDecoration: 'none', color: 'var(--fg2)', display: 'inline-block', marginBottom: '12px' }}>
          ← Back to Home
        </Link>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>All Projects &amp; Workflows</h1>
        <p className="lead">
          Directory of software applications, multi-agent AI systems, and automated workflows.
        </p>

        {/* Filter buttons */}
        <div className="actions" style={{ marginTop: '24px' }}>
          <button
            type="button"
            className={`btn ${selectedStatus === 'all' ? 'btn-primary' : 'btn-glass'} btn-sm`}
            onClick={() => setSelectedStatus('all')}
          >
            All ({counts.all})
          </button>
          <button
            type="button"
            className={`btn ${selectedStatus === 'completed' ? 'btn-primary' : 'btn-glass'} btn-sm`}
            onClick={() => setSelectedStatus('completed')}
          >
            Completed ({counts.completed})
          </button>
          <button
            type="button"
            className={`btn ${selectedStatus === 'ongoing' ? 'btn-primary' : 'btn-glass'} btn-sm`}
            onClick={() => setSelectedStatus('ongoing')}
          >
            Ongoing ({counts.ongoing})
          </button>
          <button
            type="button"
            className={`btn ${selectedStatus === 'planning' ? 'btn-primary' : 'btn-glass'} btn-sm`}
            onClick={() => setSelectedStatus('planning')}
          >
            In Planning ({counts.planning})
          </button>
        </div>
      </section>

      <section id="project-list">
        <h2 className="sh">Projects Directory</h2>
        {filteredProjects.map((p) => (
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
              <div className="actions" style={{ marginTop: '10px' }}>
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
      </section>

      <Footer />
    </main>
  );
}
