const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className='sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur'>
      <nav className='mx-auto flex max-w-5xl items-center justify-between px-6 py-4'>
        <a href='#top' className='font-semibold tracking-tight text-slate-100'>
          Cody H. Daigle
        </a>
        <ul className='flex gap-6 text-sm text-slate-300'>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className='transition hover:text-accent-light'>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
