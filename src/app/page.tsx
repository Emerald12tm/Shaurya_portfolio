import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Trajectory from "@/components/Trajectory";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import { getProjectFeed } from "@/lib/github";

// Re-rank projects from GitHub at most once an hour (ISR). Keep in sync with GITHUB_REVALIDATE.
export const revalidate = 3600;

export default async function Home() {
  const feed = await getProjectFeed();

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero feed={feed} />
        <Projects feed={feed} />
        <Trajectory />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
