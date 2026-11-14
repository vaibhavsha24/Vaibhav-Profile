import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, Moon, Rss, Sun, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { SITE_PROFILE } from '../lib/siteData';

const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/writing', label: 'Writing' },
  { to: '/now', label: 'Now' },
  { to: '/contact', label: 'Contact' },
];

export function Layout({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      const targetId = location.hash.replace(/^#/, '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[var(--accent-primary)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>

      {/* Clean 3-Zone Top Bar */}
      <header className="border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6 lg:px-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <Link
            to="/"
            className="font-serif text-lg font-medium tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0 hover:text-[var(--accent-primary)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)] rounded-sm"
          >
            {SITE_PROFILE.name}
          </Link>

          {/* Zone 2: Concise single-line navigation links */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)] rounded-sm ${
                    isActive
                      ? 'text-[var(--text-primary)] after:absolute after:inset-x-0 after:-bottom-[1px] after:h-[1.5px] after:bg-[var(--accent-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Single utility action (Theme Switch) + Mobile drawer trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] text-[var(--text-primary)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            id="mobile-nav-drawer"
            aria-label="Mobile navigation"
            className="md:hidden border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-6 py-4"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex min-h-[44px] items-center rounded-md px-3 text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-[var(--bg-surface)] text-[var(--accent-primary)]'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Editorial Footer */}
      <footer className="mt-24 border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5 space-y-3">
              <Link
                to="/"
                className="font-serif text-lg font-medium text-[var(--text-primary)]"
              >
                {SITE_PROFILE.name}
              </Link>
              <p className="max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
                Lead Engineer at Samsung R&amp;D Institute Bangalore and former Software Engineer at
                Probo India and Tata Consultancy Services. Writing and case studies across Android
                applications, AOSP NFC hardware, and AI-assisted tooling.
              </p>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h2 className="text-xs font-semibold tracking-wider uppercase text-[var(--text-muted)]">
                Sections
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about#experience"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    Experience
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    Projects &amp; Case Studies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/writing"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    Writing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/now"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    Now
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h2 className="text-xs font-semibold tracking-wider uppercase text-[var(--text-muted)]">
                Links &amp; Syndication
              </h2>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li>
                  <a
                    href={SITE_PROFILE.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    <span>GitHub ({SITE_PROFILE.githubHandle.replace('github.com/', '')})</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    <span>
                      LinkedIn ({SITE_PROFILE.linkedinHandle.replace('linkedin.com/in/', '')})
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE_PROFILE.email}`}
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    {SITE_PROFILE.email}
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_PROFILE.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    <span>Resume (PDF)</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <Link
                    to="/rss"
                    className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    <Rss className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>RSS Feed</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sitemap"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-[var(--border-hairline)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Vaibhav Sharma. Android &amp; Platform Engineering.</p>
            <p>Light &amp; Dark editorial reading themes supported.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
