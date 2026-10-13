'use client';

import { GENERAL_INFO } from '@/lib/data';

export default function ContactSection() {
  const handleCopyEmail = () => {
    const email = GENERAL_INFO.email;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(email)
        .then(() => {
          window.dispatchEvent(
            new CustomEvent('island-notify', { detail: 'Email copied' })
          );
        })
        .catch(() => {
          window.dispatchEvent(
            new CustomEvent('island-notify', { detail: 'Selected email' })
          );
        });
    } else {
      window.dispatchEvent(
        new CustomEvent('island-notify', { detail: 'Selected email' })
      );
    }
  };

  return (
    <section id="contact">
      <h2 className="sh">Contact &amp; Collaboration</h2>
      <p className="lead" style={{ margin: '0 0 22px', color: 'var(--fg2)' }}>
        Have a project in mind, an engineering role, or a technical inquiry? Copy the email address below and send a note.
      </p>
      <dl className="dl">
        <div>
          <dt>Email</dt>
          <dd>
            <div className="copy-row">
              <span className="cval mono" id="emailText" style={{ color: 'var(--fg)' }}>
                {GENERAL_INFO.email}
              </span>
              <button
                className="btn btn-glass btn-sm"
                type="button"
                onClick={handleCopyEmail}
              >
                <svg className="ic" aria-hidden="true">
                  <use href="#i-copy" />
                </svg>
                Copy
              </button>
            </div>
            <a
              href={`mailto:${GENERAL_INFO.email}`}
              style={{ fontSize: '.875rem', display: 'inline-block', marginTop: '8px' }}
            >
              Open in your mail app
            </a>
          </dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{GENERAL_INFO.location}</dd>
        </div>
        <div>
          <dt>GitHub</dt>
          <dd>
            <a href={GENERAL_INFO.github} target="_blank" rel="noopener noreferrer">
              github.com/vrlegacy
            </a>
          </dd>
        </div>
        <div>
          <dt>LinkedIn</dt>
          <dd>
            <a href={GENERAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin.com/in/vr26
            </a>
          </dd>
        </div>
      </dl>
    </section>
  );
}
