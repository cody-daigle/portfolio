export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-16">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-accent-light">
        About
      </h2>
      <div className="max-w-3xl space-y-4 text-slate-300">
        <p>
          I'm a fullstack software engineer who likes owning a feature from the database
          schema up through the interface a user actually touches. I care about code that
          is typed, tested, and boring in the ways that matter — predictable errors,
          traceable data flow, deploys nobody has to think twice about.
        </p>
        <p>
          Replace this paragraph with your own story: what you work on now, what kind of
          problems you gravitate toward, and what you're looking for next.
        </p>
      </div>
    </section>
  );
}
