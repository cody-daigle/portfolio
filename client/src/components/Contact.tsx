import { useState, type FormEvent } from "react";
import { sendContactMessage } from "../api/client";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      await sendContactMessage({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-16">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-accent-light">
        Contact
      </h2>
      <p className="mb-6 max-w-xl text-slate-400">
        Have a role, project, or question? Send a message below — it's saved straight to
        the database behind this site.
      </p>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm text-slate-300">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={120}
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-accent-light"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-slate-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-accent-light"
          />
        </div>
        <div>
          <label htmlFor="message" className="mb-1 block text-sm text-slate-300">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            maxLength={5000}
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-accent-light"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>

        {status === "success" && (
          <p className="text-sm text-emerald-400">Thanks — your message was sent.</p>
        )}
        {status === "error" && errorMessage && (
          <p className="text-sm text-red-400">{errorMessage}</p>
        )}
      </form>
    </section>
  );
}
