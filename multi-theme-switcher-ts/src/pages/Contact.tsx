import React, { useEffect, useMemo, useRef, useState } from "react";
import Card from "../components/Card";

type FormState = {
  email: string;
  subject: string;
  message: string;
  consent: boolean;
  hp: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX = 500;
const DRAFT_KEY = "contact_draft_v1";

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) return { ...JSON.parse(raw), hp: "" } as FormState;
    } catch {}
    return {
      email: "",
      subject: "General",
      message: "",
      consent: false,
      hp: "",
    };
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const validate = (s: FormState): Errors => {
    const e: Errors = {};
    if (!EMAIL_RE.test(s.email.trim()))
      e.email = "Please enter a valid email address.";
    if (!s.message.trim()) e.message = "Message is required.";
    if (s.message.length > MESSAGE_MAX)
      e.message = `Message must be under ${MESSAGE_MAX} characters.`;
    if (!s.consent) e.consent = "Please accept the terms to continue.";

    if (s.hp.trim()) e.hp = "Invalid submission.";
    return e;
  };

  const currentErrors = useMemo(() => validate(form), [form]);

  useEffect(() => {
    const id = setTimeout(() => {
      const { hp, ...safe } = form;
      localStorage.setItem(DRAFT_KEY, JSON.stringify(safe));
    }, 300);
    return () => clearTimeout(id);
  }, [form]);

  const setField =
    <K extends keyof FormState>(key: K) =>
    (value: FormState[K]) => {
      setForm((f) => ({ ...f, [key]: value }));
    };

  const focusFirstError = (errs: Errors) => {
    if (errs.email) emailRef.current?.focus();
    else if (errs.message) messageRef.current?.focus();
    else if (errs.consent) consentRef.current?.focus();
    else if (errs.hp) emailRef.current?.focus();
  };

  const onBlur = (name: keyof FormState) =>
    setTouched((t) => ({ ...t, [name]: true }));

  const remaining = MESSAGE_MAX - form.message.length;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      email: true,
      subject: true,
      message: true,
      consent: true,
      hp: true,
    });

    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      focusFirstError(errs);
      return;
    }

    try {
      setSubmitting(true);
      setSuccessMsg(null);

      await new Promise((r) => setTimeout(r, 900));

      setSuccessMsg(
        "Thanks! We’ve received your message and will get back to you soon."
      );
      setForm({
        email: "",
        subject: "General",
        message: "",
        consent: false,
        hp: "",
      });
      localStorage.removeItem(DRAFT_KEY);
      setTouched({});
    } catch {
      setSuccessMsg("Something went wrong. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-[var(--size-h1)] font-bold">Contact</h1>

      {successMsg && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-md border border-black/10 dark:border-white/10 bg-surface px-4 py-3"
        >
          {successMsg}
        </div>
      )}

      <Card title="Send us a message">
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <label className="block" htmlFor="email">
            <span className="block mb-1">Email</span>
            <input
              id="email"
              ref={emailRef}
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(e) => setField("email")(e.target.value)}
              onBlur={() => onBlur("email")}
              aria-invalid={Boolean(touched.email && currentErrors.email)}
              aria-describedby={
                touched.email && currentErrors.email ? "email-error" : undefined
              }
              className="w-full bg-bg text-fg border border-muted rounded-md px-3 py-2"
            />
            {touched.email && currentErrors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {currentErrors.email}
              </p>
            )}
          </label>

          <label className="block" htmlFor="subject">
            <span className="block mb-1">Subject</span>
            <select
              id="subject"
              ref={subjectRef}
              value={form.subject}
              onChange={(e) => setField("subject")(e.target.value)}
              onBlur={() => onBlur("subject")}
              className="w-full bg-bg text-fg border border-muted rounded-md px-3 py-2"
              aria-label="Subject"
            >
              <option>General</option>
              <option>Support</option>
              <option>Feedback</option>
              <option>Partnership</option>
            </select>
          </label>

          <label className="block" htmlFor="message">
            <span className="block mb-1">Message</span>
            <textarea
              id="message"
              ref={messageRef}
              required
              value={form.message}
              onChange={(e) =>
                setField("message")(e.target.value.slice(0, MESSAGE_MAX))
              }
              onBlur={() => onBlur("message")}
              aria-invalid={Boolean(touched.message && currentErrors.message)}
              aria-describedby={`message-help ${
                touched.message && currentErrors.message ? "message-error" : ""
              }`}
              className="w-full bg-bg text-fg border border-muted rounded-md px-3 py-2 h-40"
            />
            <div
              id="message-help"
              className="mt-1 flex items-center justify-between text-xs text-muted"
            >
              <span>Max {MESSAGE_MAX} characters</span>
              <span>{remaining} left</span>
            </div>
            {touched.message && currentErrors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-600">
                {currentErrors.message}
              </p>
            )}
          </label>

          <div className="flex items-start gap-3">
            <input
              id="consent"
              ref={consentRef}
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setField("consent")(e.target.checked)}
              onBlur={() => onBlur("consent")}
              aria-invalid={Boolean(touched.consent && currentErrors.consent)}
              className="mt-1 h-4 w-4"
              required
            />
            <label htmlFor="consent" className="text-sm">
              I agree to the processing of my information and understand this
              form is protected against spam.
            </label>
          </div>
          {touched.consent && currentErrors.consent && (
            <p className="text-sm text-red-600">{currentErrors.consent}</p>
          )}

          <div aria-hidden className="hidden">
            <label>
              Do not fill this field:
              <input
                tabIndex={-1}
                autoComplete="off"
                value={form.hp}
                onChange={(e) => setField("hp")(e.target.value)}
              />
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="bg-primary text-white rounded-md px-4 py-2 disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Send"}
            </button>
            <button
              type="button"
              className="border border-muted rounded-md px-4 py-2 hover:opacity-80"
              onClick={() => {
                setForm({
                  email: "",
                  subject: "General",
                  message: "",
                  consent: false,
                  hp: "",
                });
                localStorage.removeItem(DRAFT_KEY);
                setTouched({});
                setErrors({});
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </Card>

      <Card title="Other ways to reach us">
        <div className="text-sm text-muted space-y-1">
          <p>
            Prefer email?{" "}
            <a
              className="underline underline-offset-4"
              href="mailto:support@example.com"
            >
              support@example.com
            </a>
          </p>
          <p>
            For quick questions, ping us on{" "}
            <a
              className="underline underline-offset-4"
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              X (Twitter)
            </a>
            .
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Contact;
