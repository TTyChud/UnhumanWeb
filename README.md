# UnhumanWeb

Marketing and documentation site for [Unhuman Engine](https://github.com/unhuman-engine/UNHUMAN) —
an open-source, hand-written C++23 game engine (Vulkan RHI, Slang → SPIR-V shaders, entt ECS,
Jolt/Box2D physics, ImGui editor). MIT.

Live: <https://www.unhumanengine.xyz>

## Stack

React 18 · TypeScript · Vite · Tailwind CSS · framer-motion · lucide-react · react-router.
Two routes: `/` (landing: spec strip, capture viewport, subsystems) and `/docs` (build, presets,
tests, source layout, status, contributing) — all docs content mirrors the engine repository.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # -> dist/
npm run preview   # serve dist/
```

## Where things live

| Path | What |
|---|---|
| `src/lib/site.ts` | every repository link and the version string in the status bar |
| `src/components/Nav.tsx`, `Footer.tsx` | chrome: toolbar and status bar |
| `src/components/kit.tsx` | shared micro-UI: `MonoLabel`, `SectionHeading`, `CodeBlock`, `GithubMark` |
| `src/components/ui/button.tsx` | shadcn/ui primitive (see `components.json`) |
| `src/pages/Home.tsx`, `Docs.tsx` | the two routes |
| `src/index.css` | design tokens, blueprint grid, viewport overlay, mono type |

## Editing docs

`src/pages/Docs.tsx` carries the engine facts inline (build presets, source layout, status matrix).
When the engine repo changes, update the matching array in that file and the release tag in
`src/lib/site.ts`. Facts to keep honest: the status matrix is a dated snapshot, and anything marked
"in progress" stays marked until the repo says otherwise.

## Assets

- `public/icon.png` — 256px mark, used in the toolbar, the footer and as the favicon.
- `public/logo.png` — 1200px mark, used as the `og:image` / `twitter:image` preview.
- `public/demo.webm` — editor capture, 3.4 MB, the landing-page viewport.
