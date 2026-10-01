export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-600">
      <p>
        Built with React, Express, and PostgreSQL — {new Date().getFullYear()}.
      </p>
    </footer>
  );
}
