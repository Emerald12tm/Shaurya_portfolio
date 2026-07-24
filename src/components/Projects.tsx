import Image from "next/image";
import { projects } from "@/content";
import { ExternalLinkIcon, GithubIcon } from "./icons";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
      <h2 className="text-2xl font-semibold tracking-tight">Featured Projects</h2>
      <p className="mt-2 max-w-xl text-zinc-600 dark:text-zinc-400">
        A few projects I&apos;m proud of — quality over quantity.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex flex-col overflow-hidden rounded-2xl border border-black/[.08] transition-colors hover:border-black/[.16] dark:border-white/[.12] dark:hover:border-white/[.24]"
          >
            <div className="relative flex aspect-video items-center justify-center bg-zinc-100 dark:bg-zinc-900">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-4xl font-semibold text-zinc-300 dark:text-zinc-700">
                  {project.title.charAt(0)}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-semibold">{project.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-black/[.04] px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-white/[.08] dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex gap-4 text-sm font-medium">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:underline"
                  >
                    <ExternalLinkIcon className="size-4" />
                    Live Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:underline"
                  >
                    <GithubIcon className="size-4" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
