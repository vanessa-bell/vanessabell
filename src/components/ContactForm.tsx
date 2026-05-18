import { useState } from "react";

const FORMSPREE_URL = "https://formspree.io/f/mykvzyqv";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <p className="text-warm-gray dark:text-dark-warm-gray text-sm">
        Got it. I'll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="hidden" name="_subject" value="Portfolio contact" />
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="contact-name" className="block text-sm text-charcoal dark:text-dark-cream mb-1.5">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full px-3.5 py-2.5 rounded-lg border border-warm-gray/25 dark:border-dark-warm-gray/25 bg-cream dark:bg-dark-surface text-charcoal dark:text-dark-cream text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40 dark:focus:ring-dark-terracotta/40 transition-shadow"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm text-charcoal dark:text-dark-cream mb-1.5">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full px-3.5 py-2.5 rounded-lg border border-warm-gray/25 dark:border-dark-warm-gray/25 bg-cream dark:bg-dark-surface text-charcoal dark:text-dark-cream text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40 dark:focus:ring-dark-terracotta/40 transition-shadow"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm text-charcoal dark:text-dark-cream mb-1.5">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={3}
          className="w-full px-3.5 py-2.5 rounded-lg border border-warm-gray/25 dark:border-dark-warm-gray/25 bg-cream dark:bg-dark-surface text-charcoal dark:text-dark-cream text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40 dark:focus:ring-dark-terracotta/40 transition-shadow resize-none"
        />
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm text-terracotta dark:text-dark-terracotta">
          Something went wrong. Try again or connect on LinkedIn.
        </p>
      )}
      <div className="pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-5 py-2.5 rounded-lg bg-terracotta dark:bg-dark-terracotta text-cream dark:text-dark-bg text-sm font-medium hover:opacity-90 disabled:opacity-60 transition-opacity cursor-pointer disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}
