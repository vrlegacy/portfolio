'use client';

import parse from 'html-react-parser';
import Link from 'next/link';
import { IProject } from '@/types';
import Footer from '@/components/Footer';

interface Props {
  project: IProject;
}

export default function ProjectDetails({ project }: Props) {
  return (
    <main className="wrap">
      <section className="hero">
        <Link href="/projects" style={{ fontSize: '.875rem', textDecoration: 'none', color: 'var(--fg2)', display: 'inline-block', marginBottom: '12px' }}>
          ← Back to Projects
        </Link>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>{project.title}</h1>
        <p className="role">{project.type}</p>
        <p className="lead">{project.summary}</p>
        <div className="actions" style={{ marginTop: '20px' }}>
          {project.liveUrl && (
            <a
              className="btn btn-primary"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo
              <svg className="ic" aria-hidden="true">
                <use href="#i-up-right" />
              </svg>
            </a>
          )}
          {project.sourceCode && (
            <a
              className="btn btn-glass"
              href={project.sourceCode}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repo
              <svg className="ic" aria-hidden="true">
                <use href="#i-up-right" />
              </svg>
            </a>
          )}
        </div>
      </section>

      <section id="project-overview">
        <h2 className="sh">Project Overview</h2>
        <div className="prose">
          {parse(project.description)}
        </div>

        {project.role && (
          <>
            <h2 className="sh" style={{ marginTop: '40px' }}>Engineering Role</h2>
            <div className="prose">
              {parse(project.role)}
            </div>
          </>
        )}

        <h2 className="sh" style={{ marginTop: '40px' }}>Technologies Used</h2>
        <p className="tech" style={{ fontSize: '1rem' }}>
          {project.techStack.join(' · ')}
        </p>

        {project.video && (
          <>
            <h2 className="sh" style={{ marginTop: '40px' }}>Demonstration Video</h2>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--hair)', background: '#000' }}>
              <iframe
                src={project.video}
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}
