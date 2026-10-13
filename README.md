# Personal Portfolio

A personal portfolio site built with Next.js, TypeScript, and Tailwind CSS.

## Editing your content

All of the text on the site — your name, bio, projects, skills, education,
and social links — lives in one file: [`src/content.ts`](src/content.ts).
You don't need to touch any component code to update the site; just edit
the values in that file.

While the dev server is running (`npm run dev`), any save to `content.ts`
hot-reloads the page in your browser instantly, so you can see changes in
real time as you type.

### How projects are ranked

The Projects section isn't a hand-written list. Every hour the site pulls
your public GitHub repos and scores each original (non-fork) one on:

- **Activity**: commit count (log-scaled)
- **Momentum**: how recently it was pushed (fades over ~3 months)
- **Substance**: bytes of code
- **Reach**: stars, forks, a live site, a description

The scoring lives in [`src/lib/ranking.ts`](src/lib/ranking.ts) and is
covered by `npm test`. To control what appears:

- Hide a repo: add its name to `github.hidden` in `src/content.ts`.
- Give a repo a proper write-up: add an entry to `projectNotes` keyed by
  the repo name in lowercase. Repos without one use their GitHub description.
- Optional: set a `GITHUB_TOKEN` environment variable in Vercel to raise
  the GitHub API rate limit. Anonymous access works fine at hourly refresh.

If GitHub can't be reached, the site shows the `projectNotes` entries as a
saved snapshot instead of breaking.

### Adding project screenshots

1. Drop an image into the `public/projects/` folder,
   e.g. `public/projects/my-app.png`.
2. Set `image: "/projects/my-app.png"` on that repo's entry in
   `projectNotes` in `src/content.ts`.

### Adding your resume

Replace [`public/resume.pdf`](public/resume.pdf) (currently a placeholder)
with your real resume, keeping the same filename — the "Download Resume"
buttons already link to `/resume.pdf`.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), sign in, and import the
   GitHub repo.
3. Vercel auto-detects Next.js — click **Deploy**, no configuration needed.
4. From then on, every `git push` to your main branch automatically
   redeploys the live site.
