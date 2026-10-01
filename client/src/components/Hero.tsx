export default function Hero() {
  return (
    <section
      id='top'
      className='mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-20 pt-24'>
      <p className='font-mono text-sm text-accent-light'>Hi, I'm</p>
      <h1 className='text-4xl font-bold tracking-tight text-slate-50 sm:text-6xl'>
        Cody Daigle
      </h1>
      <h2 className='text-2xl font-semibold text-slate-400 sm:text-3xl'>
        End to end
      </h2>
      <p className='max-w-2xl text-slate-400'>
        Software engineer focused on problem solving and creating innovative
        ways to turn ideas into reliable products, from the database to the UI.
        This site itself is a working example: a React client, an Express API,
        and a Postgres database, with CI running the test suite on every push.
      </p>
      <div className='flex gap-4 pt-2'>
        <a
          href='#projects'
          className='rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-dark'>
          View projects
        </a>
        <a
          href='#contact'
          className='rounded-md border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-accent-light hover:text-accent-light'>
          Get in touch
        </a>
      </div>
    </section>
  );
}
