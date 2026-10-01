import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { usePortfolioData } from "./hooks/usePortfolioData";

export default function App() {
  const { data, loading, error } = usePortfolioData();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />

        {loading && (
          <p className="mx-auto max-w-5xl px-6 py-16 text-slate-500">Loading portfolio data…</p>
        )}

        {error && (
          <p className="mx-auto max-w-5xl px-6 py-16 text-red-400">
            Couldn't load portfolio data: {error}. Is the API server running?
          </p>
        )}

        {data && (
          <>
            <Skills skills={data.skills} />
            <Projects projects={data.projects} />
            <Experience experience={data.experience} />
          </>
        )}

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
