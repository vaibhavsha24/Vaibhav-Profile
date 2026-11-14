import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import { EditorialImage } from '../components/EditorialImage';
import { usePageMetadata } from '../hooks/usePageMetadata';
import {
  EDUCATION_LIST,
  EXPERIENCE_LIST,
  SITE_PROFILE,
  TECHNICAL_SKILLS,
} from '../lib/siteData';

export function AboutPage() {
  usePageMetadata({
    title: 'About & Experience — Vaibhav Sharma',
    description:
      'Vaibhav Sharma’s 5-year engineering journey across Tata Consultancy Services, Probo India, and Samsung R&D Institute Bangalore, plus Education and Technical Skills.',
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20 lg:px-8">
      {/* Header & Concise Professional Story */}
      <section className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">
            <span className="font-medium tracking-wider uppercase">About</span>
            <span aria-hidden="true">·</span>
            <a href="#experience" className="hover:text-[var(--accent-primary)] transition-colors">
              Experience
            </a>
            <span aria-hidden="true">·</span>
            <a href="#education" className="hover:text-[var(--accent-primary)] transition-colors">
              Education
            </a>
            <span aria-hidden="true">·</span>
            <a href="#skills" className="hover:text-[var(--accent-primary)] transition-colors">
              Technical Skills
            </a>
          </div>

          <h1 className="font-serif text-[clamp(2rem,3.6vw,3.1rem)] font-medium leading-[1.12] tracking-tight text-[var(--text-primary)]">
            From consumer Android applications to AOSP platform, NFC hardware, and AI tooling.
          </h1>

          <div className="space-y-4 text-base leading-relaxed text-[var(--text-secondary)] max-w-2xl">
            <p>{SITE_PROFILE.aboutStory}</p>
            <p>
              Currently a{' '}
              <strong className="font-semibold text-[var(--text-primary)]">
                Lead Engineer at Samsung R&amp;D Institute Bangalore
              </strong>
              , and previously a{' '}
              <strong className="font-semibold text-[var(--text-primary)]">
                Software Engineer at Probo India
              </strong>{' '}
              and{' '}
              <strong className="font-semibold text-[var(--text-primary)]">
                Tata Consultancy Services
              </strong>
              , my work bridges consumer-grade Kotlin and Jetpack Compose interfaces with Android
              framework ownership, device bring-up, hardware validation, and AI-assisted developer
              workflows.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href={SITE_PROFILE.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[var(--btn-primary-bg)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--btn-primary-hover)] transition-colors whitespace-nowrap shrink-0"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>View / Download Resume (PDF)</span>
            </a>
            <Link
              to="/writing"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Read Articles</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-start lg:justify-end">
          <EditorialImage
            src={SITE_PROFILE.profilePhotoPath}
            alt={SITE_PROFILE.profilePhotoAlt}
            aspectClassName="aspect-square"
            className="w-full max-w-[400px]"
            imgClassName="object-cover object-top"
            caption={SITE_PROFILE.profilePhotoCaption}
          />
        </div>
      </section>

      {/* Detailed Experience Sections: Samsung R&D Institute, Probo India & TCS */}
      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="mt-20 scroll-mt-10 border-t border-[var(--border-hairline)] pt-14"
      >
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-medium text-[var(--text-muted)]">
            Professional Experience
          </p>
          <h2
            id="experience-heading"
            className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]"
          >
            Platform Engineering &amp; Consumer Android Roles
          </h2>
        </div>

        <div className="mt-10 space-y-8">
          {EXPERIENCE_LIST.map((exp) => (
            <article
              key={exp.id}
              className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6 sm:p-9"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4 space-y-2">
                  <p className="font-mono text-xs text-[var(--text-muted)]">{exp.periodLabel}</p>
                  <h3 className="font-serif text-2xl font-medium text-[var(--text-primary)]">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-medium text-[var(--accent-primary)]">
                    {exp.organization}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">{exp.location}</p>
                </div>

                <div className="lg:col-span-8 space-y-5">
                  <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                    {exp.summary}
                  </p>

                  <ul className="space-y-2.5 text-sm leading-relaxed text-[var(--text-primary)] list-disc pl-5">
                    {exp.highlights.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>

                  {exp.outcomes && (
                    <dl className="grid grid-cols-2 gap-5 border-t border-[var(--border-hairline)] pt-5 sm:grid-cols-4">
                      {exp.outcomes.map((outcome) => (
                        <div key={outcome.label} className="space-y-1">
                          <dt className="font-mono text-xl font-semibold tabular-nums text-[var(--text-primary)]">
                            {outcome.value}
                          </dt>
                          <dd className="text-xs leading-snug text-[var(--text-secondary)]">
                            {outcome.label}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        aria-labelledby="education-heading"
        className="mt-20 scroll-mt-10 border-t border-[var(--border-hairline)] pt-14"
      >
        <div className="space-y-2">
          <p className="text-xs font-medium text-[var(--text-muted)]">Academic Background</p>
          <h2
            id="education-heading"
            className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]"
          >
            Education
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {EDUCATION_LIST.map((edu) => (
            <div
              key={edu.id}
              className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-2"
            >
              <div className="flex items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
                <span>{edu.location}</span>
                <span className="font-mono tabular-nums">{edu.year}</span>
              </div>
              <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
                {edu.degree}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">{edu.institution}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Skills Matrix (Exact 6 Categories from Resume) */}
      <section
        id="skills"
        aria-labelledby="skills-heading"
        className="mt-20 scroll-mt-10 border-t border-[var(--border-hairline)] pt-14"
      >
        <div className="space-y-2">
          <p className="text-xs font-medium text-[var(--text-muted)]">
            Technical Skills
          </p>
          <h2
            id="skills-heading"
            className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]"
          >
            Languages, Android Stack, Connectivity, AI &amp; DevOps
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TECHNICAL_SKILLS.map((group) => (
            <div key={group.category} className="space-y-3">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] border-b border-[var(--border-hairline)] pb-2">
                {group.category}
              </h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Next Navigation CTA */}
      <section className="mt-20 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2 max-w-xl">
            <h2 className="font-serif text-2xl font-medium text-[var(--text-primary)]">
              Explore projects &amp; engineering case studies
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Detailed breakdowns covering Birdie, the Android NFC framework, Mobly + PN532 Dragon
              Reader automation, app performance optimization, socket architecture, and AI tooling.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/projects"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[var(--btn-primary-bg)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--btn-primary-hover)] transition-colors whitespace-nowrap shrink-0"
            >
              <span>View Case Studies</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/now"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Current Focus</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
