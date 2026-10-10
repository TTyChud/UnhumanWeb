import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import EngineDiagram from "@/components/EngineDiagram";
import { GithubMark, MonoLabel } from "@/components/kit";
import { links } from "@/lib/site";

const specs = [
  { key: "RHI", value: "Vulkan 1.1+" },
  { key: "Shaders", value: "Slang → SPIR-V" },
  { key: "Language", value: "C++23" },
  { key: "ECS", value: "entt" },
  { key: "Physics", value: "Jolt · Box2D" },
  { key: "Tooling", value: "ImGui · Tracy" },
];

/** Sandbox layer names and the CTest label are real entry points in the repository. */
const readouts = [
  ["capture", "1920 × 1080 · webm"],
  ["layer", "sandbox · ModelTestLayer"],
  ["editor", "ImGui · docking"],
  ["tests", "ctest -L unit"],
];

const legend = [
  { label: "Implemented", color: "text-primary" },
  { label: "In progress", color: "text-amber-400" },
  { label: "Planned", color: "text-white/40" },
];

const subsystems = [
  {
    index: "01",
    title: "Vulkan RHI",
    body: "Hand-written backend on volk and VMA: instance, physical and logical device, swapchain, pipeline state, deferred deletion and a modernised descriptor backend. Sync2 path with a Vulkan 1.1 fallback in progress.",
    href: links.module("UHE/src/Platform/Vulkan"),
  },
  {
    index: "02",
    title: "Shader system",
    body: "Slang compiled to SPIR-V at runtime, driven by a shader manager and a virtual file system so asset paths stay portable across Linux and Windows builds.",
    href: links.module("UHE/src/UHE/Renderer"),
  },
  {
    index: "03",
    title: "Scene and editor",
    body: "entt-based ECS with an ImGui editor: docking, gizmos, drag-and-drop, yaml-cpp scene serialisation and fastgltf model import. Render graph is being built against the same scene.",
    href: links.module("UHE/src/UHE/Scene"),
  },
  {
    index: "04",
    title: "Runtime",
    body: "Job system plus task graph, miniaudio audio backend, MSDF text, Tracy instrumentation, and CI that builds both platforms and runs in sanitizer configurations.",
    href: links.module("UHE/src/UHE/Jobsystem"),
  },
];

const corners = [
  "left-0 top-0 border-l border-t",
  "right-0 top-0 border-r border-t",
  "left-0 bottom-0 border-l border-b",
  "right-0 bottom-0 border-r border-b",
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      {/* ---------------------------------------------------------- hero */}
      <section className="relative pt-20 pb-12 md:pt-28">
        {/* blueprint stamp */}
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-4 right-0 hidden h-[360px] w-auto select-none opacity-[0.05] lg:block"
        />

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <MonoLabel className="text-white/40">UHE / REV v0.01-alpha</MonoLabel>
            <span className="flex items-center gap-2 text-amber-400/90">
              <span className="status-dot" />
              <MonoLabel className="text-amber-400/90">Active development</MonoLabel>
            </span>
          </div>

          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
            A game engine written by hand, down to the command buffer.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Open-source C++23 engine: Vulkan RHI without a framework doing the thinking, Slang
            shaders compiled at runtime, entt ECS, Jolt and Box2D physics, ImGui editor. Linux
            first, Windows too.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/docs"
              className="group inline-flex items-center gap-2 rounded bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Read the docs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={links.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded border border-white/[0.12] bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/[0.05]"
            >
              <GithubMark className="h-4 w-4" />
              Source on GitHub
            </a>
            <a
              href={links.releases}
              target="_blank"
              rel="noreferrer"
              className="mono-label inline-flex items-center gap-1.5 px-1 py-2.5 transition-colors hover:text-white"
            >
              v0.01-alpha builds
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>

          {/* Spec strip */}
          <dl className="mt-12 grid grid-cols-2 border-l border-t border-white/[0.07] sm:grid-cols-3 lg:grid-cols-6">
            {specs.map((spec) => (
              <div key={spec.key} className="border-b border-r border-white/[0.07] px-4 py-3">
                <dt className="mono-label text-white/35">{spec.key}</dt>
                <dd className="mono mt-1.5 text-[13px] text-white/90">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* ------------------------------------------------------ viewport */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-14"
        >
          <div className="overflow-hidden rounded-md border border-white/[0.09] bg-black">
            <div className="flex items-center gap-3 border-b border-white/[0.09] bg-white/[0.02] px-4 py-2">
              <span className="status-dot text-primary/70" />
              <MonoLabel className="text-white/55">unhuman sandbox — model test layer</MonoLabel>
              <MonoLabel className="ml-auto hidden text-white/30 sm:inline">
                engine + editor build
              </MonoLabel>
            </div>

            <div className="relative aspect-video">
              <video autoPlay loop muted playsInline className="h-full w-full object-cover">
                <source src="/demo.webm" type="video/webm" />
              </video>
              <div className="viewport-overlay pointer-events-none absolute inset-0" aria-hidden="true" />

              {/* HUD: corner brackets and edge rulers */}
              {corners.map((corner) => (
                <span
                  key={corner}
                  aria-hidden="true"
                  className={`pointer-events-none absolute h-3 w-3 border-primary/60 ${corner}`}
                />
              ))}
              <span
                aria-hidden="true"
                className="ruler-y pointer-events-none absolute inset-y-4 left-1 w-1"
              />
              <span
                aria-hidden="true"
                className="ruler-x pointer-events-none absolute inset-x-4 bottom-1 h-1"
              />
            </div>

            {/* Readout rail */}
            <dl className="grid grid-cols-2 border-t border-white/[0.09] bg-white/[0.02] md:grid-cols-4">
              {readouts.map(([key, value]) => (
                <div key={key} className="border-b border-r border-white/[0.07] px-4 py-2.5 last:border-r-0">
                  <dt className="mono-label text-white/30">{key}</dt>
                  <dd className="mono mt-1 text-[11px] text-white/70">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.figure>
      </section>

      {/* --------------------------------------------------- frame pipeline */}
      <section id="pipeline" className="scroll-mt-20 pt-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.07] pb-4">
          <div className="flex items-baseline gap-3">
            <MonoLabel className="text-primary">01</MonoLabel>
            <h2 className="text-xl font-semibold uppercase tracking-[0.02em] text-white md:text-2xl">
              Frame pipeline
            </h2>
          </div>
          <a
            href={links.architecture("vulkan-sync-and-rendergraph.md")}
            target="_blank"
            rel="noreferrer"
            className="mono-label inline-flex items-center gap-1.5 transition-colors hover:text-white"
          >
            Sync & render graph doc
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        <div className="panel p-5 md:p-7">
          <EngineDiagram />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
          {legend.map((item) => (
            <span key={item.label} className="flex items-center gap-2">
              <span className={`status-dot ${item.color}`} />
              <MonoLabel className={item.color}>{item.label}</MonoLabel>
            </span>
          ))}
          <span className="mono-label text-white/25">Node names map 1:1 to directories in UHE/src</span>
        </div>
      </section>

      {/* ---------------------------------------------------- subsystems */}
      <section id="architecture" className="scroll-mt-20 pt-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.07] pb-4">
          <div className="flex items-baseline gap-3">
            <MonoLabel className="text-primary">02</MonoLabel>
            <h2 className="text-xl font-semibold uppercase tracking-[0.02em] text-white md:text-2xl">
              Subsystems
            </h2>
          </div>
          <a
            href={links.module("UHE/src")}
            target="_blank"
            rel="noreferrer"
            className="mono-label inline-flex items-center gap-1.5 transition-colors hover:text-white"
          >
            Browse the tree
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 border-l border-t border-white/[0.07] md:grid-cols-2">
          {subsystems.map((item) => (
            <a
              key={item.index}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group border-b border-r border-white/[0.07] p-7 transition-colors hover:bg-white/[0.02] focus-visible:bg-white/[0.03] focus-visible:outline-none md:p-9"
            >
              <div className="flex items-baseline justify-between">
                <MonoLabel className="text-white/30 transition-colors group-hover:text-primary/80">
                  {item.index}
                </MonoLabel>
                <ArrowUpRight className="h-4 w-4 text-white/20 transition-colors group-hover:text-primary" />
              </div>
              <h3 className="mt-5 text-lg font-medium text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- start here */}
      <section className="pt-16">
        <div className="panel grid gap-6 p-7 md:grid-cols-[1fr_1.1fr] md:items-center md:p-9">
          <div>
            <MonoLabel className="text-primary">03 / Build it</MonoLabel>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white md:text-2xl">
              Clone, configure, build.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Submodules are vendored, Slang is fetched by the setup script, and CMake presets cover
              debug, release and every sanitizer. Full instructions in the docs.
            </p>
            <a
              href={links.docsIndex}
              target="_blank"
              rel="noreferrer"
              className="mono-label mt-5 inline-flex items-center gap-1.5 text-primary transition-colors hover:text-white"
            >
              In-repo documentation
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
          <pre className="code-block">
            <code>
              <span className="block text-muted-foreground/60"># recursive: engine vendors its deps</span>
              <span className="block">
                <span className="select-none text-primary/50">$ </span>
                git clone --recursive {links.repo}
              </span>
              <span className="block">
                <span className="select-none text-primary/50">$ </span>
                cmake --preset default &amp;&amp; cmake --build --preset default -j
              </span>
              <span className="block">
                <span className="select-none text-primary/50">$ </span>
                <span className="blink">_</span>
              </span>
            </code>
          </pre>
        </div>
      </section>
    </div>
  );
}
