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

### Adding project screenshots

1. Drop an image into the `public/projects/` folder (create it if it
   doesn't exist), e.g. `public/projects/my-app.png`.
2. Set `image: "/projects/my-app.png"` on that project in `src/content.ts`.

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
