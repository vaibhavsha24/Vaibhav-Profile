import { useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Mail,
  Phone,
  Send,
} from 'lucide-react';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { validateContactForm, type ContactSubmission } from '../lib/content';
import { SITE_PROFILE } from '../lib/siteData';

export function ContactPage() {
  usePageMetadata({
    title: 'Contact — Vaibhav Sharma',
    description:
      'Contact Vaibhav Sharma regarding Android application and platform engineering, AOSP NFC systems, hardware validation, AI tooling, or technical writing.',
  });

  const [form, setForm] = useState<ContactSubmission>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactSubmission, string>>>(
    {}
  );
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validation = validateContactForm(form);
    if (!validation.valid) {
      setFieldErrors(validation.errors);
      setStatus('error');
      setServerMessage('Please review the highlighted fields before sending.');
      return;
    }

    setFieldErrors({});
    setStatus('submitting');
    setServerMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        errors?: Partial<Record<keyof ContactSubmission, string>>;
      };

      if (!response.ok || !data.ok) {
        setStatus('error');
        if (data.errors) setFieldErrors(data.errors);
        setServerMessage('Unable to send message. Please check your details and try again.');
        return;
      }

      setStatus('success');
      setServerMessage(data.message || 'Message received. Thank you for reaching out.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      setServerMessage('Network error while sending message. Please try again shortly.');
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column: Direct Verified Contact Details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <p className="text-xs font-medium text-[var(--text-muted)]">Contact</p>
            <h1 className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.12] tracking-tight text-[var(--text-primary)]">
              Start a conversation
            </h1>
            <p className="text-base leading-relaxed text-[var(--text-secondary)]">
              Open to technical conversations around Android engineering, AOSP and NFC framework
              internals, hardware-in-the-loop automation, mobile reliability, and AI engineering
              workflows.
            </p>
          </div>

          <dl className="divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)] text-sm">
            <div className="py-4 flex flex-col gap-1">
              <dt className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                Current Role
              </dt>
              <dd className="text-[var(--text-primary)]">{SITE_PROFILE.roleTitle}</dd>
            </div>

            <div className="py-4 flex flex-col gap-1">
              <dt className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                Direct Email
              </dt>
              <dd>
                <a
                  href={`mailto:${SITE_PROFILE.email}`}
                  className="inline-flex items-center gap-2 font-mono text-xs text-[var(--accent-primary)] hover:underline"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{SITE_PROFILE.email}</span>
                </a>
              </dd>
            </div>

            <div className="py-4 flex flex-col gap-1">
              <dt className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                Phone
              </dt>
              <dd>
                <a
                  href={`tel:${SITE_PROFILE.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{SITE_PROFILE.phone}</span>
                </a>
              </dd>
            </div>

            <div className="py-4 flex flex-col gap-1">
              <dt className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                GitHub
              </dt>
              <dd>
                <a
                  href={SITE_PROFILE.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                >
                  <span>{SITE_PROFILE.githubHandle}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </dd>
            </div>

            <div className="py-4 flex flex-col gap-1">
              <dt className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                LinkedIn
              </dt>
              <dd>
                <a
                  href={SITE_PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                >
                  <span>{SITE_PROFILE.linkedinHandle}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </dd>
            </div>

            <div className="py-4 flex flex-col gap-1">
              <dt className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                Resume
              </dt>
              <dd>
                <a
                  href={SITE_PROFILE.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-[var(--accent-primary)] hover:underline"
                >
                  <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Vaibhav Sharma — Resume (PDF)</span>
                </a>
              </dd>
            </div>

            <div className="py-4 flex flex-col gap-1">
              <dt className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                Location
              </dt>
              <dd className="text-[var(--text-secondary)]">{SITE_PROFILE.location}</dd>
            </div>
          </dl>
        </div>

        {/* Right Column: Validated Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6 sm:p-9">
            <h2 className="font-serif text-2xl font-medium text-[var(--text-primary)]">
              Send a message
            </h2>
            <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
              Messages submitted here are validated and saved via the site API endpoint.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, name: e.target.value }));
                      if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="Your name"
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                    className="min-h-[44px] w-full rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
                  />
                  {fieldErrors.name && (
                    <p id="contact-name-error" className="text-xs text-red-700 dark:text-red-400">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, email: e.target.value }));
                      if (fieldErrors.email) {
                        setFieldErrors((prev) => ({ ...prev, email: undefined }));
                      }
                    }}
                    placeholder="you@domain.com"
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                    className="min-h-[44px] w-full rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
                  />
                  {fieldErrors.email && (
                    <p id="contact-email-error" className="text-xs text-red-700 dark:text-red-400">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-medium text-[var(--text-secondary)]"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, subject: e.target.value }));
                    if (fieldErrors.subject) {
                      setFieldErrors((prev) => ({ ...prev, subject: undefined }));
                    }
                  }}
                  placeholder="Android engineering, NFC systems, or general inquiry"
                  aria-invalid={Boolean(fieldErrors.subject)}
                  aria-describedby={fieldErrors.subject ? 'contact-subject-error' : undefined}
                  className="min-h-[44px] w-full rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
                />
                {fieldErrors.subject && (
                  <p id="contact-subject-error" className="text-xs text-red-700 dark:text-red-400">
                    {fieldErrors.subject}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-[var(--text-secondary)]"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, message: e.target.value }));
                    if (fieldErrors.message) {
                      setFieldErrors((prev) => ({ ...prev, message: undefined }));
                    }
                  }}
                  placeholder="Share context or questions..."
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                  className="w-full rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
                />
                {fieldErrors.message && (
                  <p id="contact-message-error" className="text-xs text-red-700 dark:text-red-400">
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[var(--btn-primary-bg)] px-6 py-2.5 text-sm font-medium text-white hover:bg-[var(--btn-primary-hover)] disabled:opacity-60 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>{status === 'submitting' ? 'Sending...' : 'Send message'}</span>
                </button>

                {serverMessage && (
                  <div
                    role={status === 'error' ? 'alert' : 'status'}
                    className={`flex items-center gap-2 text-xs font-medium ${
                      status === 'error'
                        ? 'text-red-700 dark:text-red-400'
                        : 'text-emerald-800 dark:text-emerald-400'
                    }`}
                  >
                    {status === 'error' ? (
                      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    )}
                    <span>{serverMessage}</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
