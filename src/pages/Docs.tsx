import type { ReactNode } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { CodeBlock, MonoLabel } from "@/components/kit";
import { REPO, links } from "@/lib/site";

/* Every value on this page is traceable to the engine repository:
   IDEA.md, CONTRIBUTING.md, CMakeLists.txt, CMakePresets.json, .gitmodules,
   docs/reference/libraries.md and the checked-in source tree. */

const sections = [
  { id: "overview", label: "Overview" },
  { id: "requirements", label: "Requirements" },
  { id: "build", label: "Build" },
  { id: "presets", label: "Presets" },
  { id: "tests", label: "Tests & profiling" },
  { id: "layout", label: "Source layout" },
  { id: "libraries", label: "Third-party" },
  { id: "status", label: "Status" },
  { id: "contributing", label: "Contributing" },
  { id: "in-repo-docs", label: "In-repo docs" },
  { id: "releases", label: "Releases" },
];

const requirements = [
  ["OS", "Linux (primary target) · Windows"],
  ["GPU", "Vulkan 1.1+ — low-end floor is Vega 7 / GFX9 class hardware"],
  ["Compiler", "C++23 capable: GCC, Clang or MSVC"],
  ["Build", "CMake ≥ 3.21 (presets) + Ninja"],
  ["Git", "clone with submodules — dependencies are vendored"],
  ["Python", "python3, used by script/Setup.py to fetch Slang"],
];

const presets = [
  ["default", "build/", "no sanitizer, multi-config style"],
  ["debug", "build_debug/", "Debug, asserts on"],
  ["release", "build-release/", "Release, optimised"],
  ["sanitizer", "build_san/", "Debug + the sanitizers you pass in -DUHE_SANITIZER=<name>"],
  ["asan · ubsan · asan-ubsan · lsan", "build_asan/ · build_ubsan/ · build_asan_ubsan/ · build_lsan/", "one dedicated build dir each"],
  ["tsan", "build_tsan/", "ThreadSanitizer — must run alone"],
  ["msan", "build_msan/", "MemorySanitizer — Clang + instrumented libc++ only"],
];

const layout = [
  ["UHE/src/UHE/Core", "application and layer loop, entry point, logging, window/input abstraction"],
  ["UHE/src/UHE/RHI", "backend-agnostic device, command buffer, swapchain, shader and texture interfaces"],
  ["UHE/src/Platform/Vulkan", "the Vulkan backend: instance, physical/logical device, swapchain, pipelines, descriptor manager, render graph (builder · compiler · executor · resources), VMA usage"],
  ["UHE/src/Platform/Linux · Windows", "platform windows, input, platform utils"],
  ["UHE/src/UHE/Renderer · Renderer2D · Renderer3D", "camera and editor camera, framebuffer, Slang compiler, sprite/2D path, 3D path with lights, SSAO and animator"],
  ["UHE/src/UHE/Scene", "entt entities and components, scene camera, YAML scene serialisation"],
  ["UHE/src/UHE/Jobsystem", "worker threads and task graph"],
  ["UHE/src/UHE/Audio", "audio engine on a miniaudio backend"],
  ["UHE/src/UHE/Physics", "3D physics system; Box2D handles the 2D path"],
  ["UHE/src/UHE/ImGui", "editor layer, docking, input routing, log sink"],
  ["UHE/src/UHE/Debug", "Tracy instrumentation setup"],
  ["UHE/src/UHE/AssestsManager", "shader manager and virtual file system (path-based; naming debt tracked in the roadmap)"],
  ["UHE/src/UHE/Animation", "sprite animation"],
  ["UHE/src/UHE/Math · Utils · Events", "math, object pool, YAML and platform utils, event types"],
  ["sandbox/", "the test application — layers that exercise renderer and editor, used as the acceptance test"],
  ["tests/", "CTest unit tests (rendergraph, scene)"],
];

const libraries = [
  ["ECS", "entt"],
  ["Rendering", "volk, VulkanMemoryAllocator, GLFW, glm, Glad, Slang (fetched by script/Setup.py)"],
  ["Shaders & text", "msdf-atlas-gen"],
  ["Scene & assets", "fastgltf, yaml-cpp, stb_image"],
  ["Editor", "imgui, imGuizmo"],
  ["Physics", "Jolt (3D), Box2D (2D)"],
  ["Audio", "miniaudio"],
  ["Profiling & logging", "Tracy, spdlog"],
];

const status = [
  ["Vulkan backend", "Works on GFX9; descriptor backend modernised; sync2 path plus a Vulkan 1.1 fallback in progress (PR #27)"],
  ["JobSystem + TaskGraph", "Implemented and documented"],
  ["Rendering", "Deferred-ish single-pass renderer, PBR-ish shading, MSDF text"],
  ["glTF", "Partial: baseColor + metallicRoughness only — foliage and multi-node models render wrong (#29)"],
  ["Audio", "miniaudio integration landed; assets, voices and buses not designed in yet"],
  ["Assets", "Path-based, no registry, AssestsManager naming debt"],
  ["Render graph", "Designed in detail, empty stub in the tree"],
  ["CI", "Builds both platforms, headless Lavapipe smoke test, sanitizer workflows"],
  ["Editor", "ImGui editor, docking, gizmos, drag-and-drop; entity hierarchy is single-parent only (#17)"],
];

const contributing = [
  "C++23 only. Use modern standard-library and language features where they earn their place.",
  "Run clang-format before pushing; clang-tidy is advisory — apply common sense instead of obeying rules that hurt performance or readability.",
  "Include uhepch.h first in every .cpp; in headers prefer forward declarations over includes to keep build times down.",
  "One feature or fix per pull request, and never break the build on either platform.",
  "Complex systems (solvers, allocators) need a sandbox test layer proving they work and do not leak.",
  "Design docs live in docs/ with a status block, one topic per file, kebab-case names.",
  "Open an issue and add a roadmap row for new work; name the row in the PR body.",
  "Commit messages are prefixed with the subsystem: Vulkan:, Renderer:, AssetSystem:, Core:, Doc:.",
  "Sign the CLA before a first pull request is merged.",
];

const inRepoDocs = [
  ["docs/README.md", "documentation index — start here"],
  ["docs/ROADMAP.md", "the work order, vocabulary and milestones"],
  ["docs/WORK_ORDER.md", "current work item"],
  ["docs/architecture/vulkan-sync-and-rendergraph.md", "synchronisation and the render graph"],
  ["docs/architecture/framegraph-and-rendergraph.md", "frame graph design"],
  ["docs/architecture/jobsystem.md", "job system and task graph"],
  ["docs/architecture/assets-and-audio.md", "assets and audio design"],
  ["docs/architecture/scripting.md", "scripting design"],
  ["docs/architecture/ci-cd.md", "pipelines and test infrastructure"],
  ["docs/backlog/renderer.md", "renderer backlog"],
  ["docs/reference/libraries.md", "third-party library shortlist"],
  ["IDEA.md", "what the engine is, why it exists, what it is not"],
];

function DocLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`link-underline inline-flex items-baseline gap-1 text-white/90 hover:text-white ${className}`}
    >
      {children}
      <ArrowUpRight className="h-3 w-3 shrink-0 text-primary/70" />
    </a>
  );
}

function Section({
  id,
  index,
  title,
  summary,
  children,
}: {
  id: string;
  index: string;
  title: string;
  summary?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-white/[0.07] pt-8 pb-4">
      <header className="mb-5">
        <div className="flex items-baseline gap-3">
          <MonoLabel className="text-primary">{index}</MonoLabel>
          <h2 className="text-lg font-semibold uppercase tracking-[0.02em] text-white md:text-xl">
            {title}
          </h2>
        </div>
        {summary ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{summary}</p>
        ) : null}
      </header>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function KeyValue({ rows }: { rows: (string | ReactNode)[][] }) {
  return (
    <dl className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
      {rows.map(([key, value], i) => (
        <div key={i} className="grid gap-1 py-3 sm:grid-cols-[220px_1fr] sm:gap-6">
          <dt className="mono text-[13px] text-white/60">{key}</dt>
          <dd className="text-sm leading-relaxed text-muted-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr>
            {head.map((cell) => (
              <th
                key={cell}
                className="mono-label border-b border-white/[0.07] pb-2 pr-6 font-normal text-white/50"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.07]">
          {rows.map((row, i) => (
            <tr key={i} className="align-top">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`py-3 pr-6 leading-relaxed ${j === 0 ? "mono text-[13px] text-white/85" : "text-muted-foreground"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Docs() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-8 md:px-8">
      <header className="pt-16 pb-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-white/[0.07] pb-4">
          <MonoLabel className="text-white/40">~ / unhuman / docs</MonoLabel>
          <MonoLabel className="text-white/20">branch</MonoLabel>
          <span className="mono text-[11px] text-white/70">master</span>
          <span className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-1">
            {["C++23", "Vulkan 1.1+", "MIT"].map((chip) => (
              <MonoLabel key={chip} className="text-white/40">
                {chip}
              </MonoLabel>
            ))}
          </span>
        </div>

        <MonoLabel className="mt-8 block text-white/40">Documentation</MonoLabel>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Unhuman Engine, as it actually is.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Build it, read the tree, and know which parts are finished. These pages track{" "}
          <DocLink href={REPO}>unhuman-engine/UNHUMAN</DocLink> — the repository stays the source of
          truth, including everything below marked as in progress.
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
        <nav aria-label="Documentation sections" className="lg:sticky lg:top-20 lg:self-start">
          <MonoLabel className="text-white/40">Sections</MonoLabel>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 lg:block lg:space-y-2.5">
            {sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="mono-label inline-flex items-baseline gap-2 transition-colors hover:text-white lg:flex"
                >
                  <span className="text-white/25">{String(i).padStart(2, "0")}</span>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={links.repo}
            target="_blank"
            rel="noreferrer"
            className="mt-6 hidden items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-white lg:inline-flex"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open the repository
          </a>
        </nav>

        <article>
          <Section
            id="overview"
            index="00"
            title="Overview"
            summary="UHE is a hand-written, cross-platform C++ game engine: a Vulkan RHI written directly against the API, Slang shaders compiled to SPIR-V at runtime, entt ECS, Jolt and Box2D physics, an ImGui editor, a job system with a task graph, Tracy profiling, and a sandbox layer that acts as the only honest acceptance test."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="panel p-5">
                <MonoLabel className="text-primary">Non-negotiable</MonoLabel>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  <li>Vulkan 1.1–1.2 floor: a design that silently needs 1.3+ is wrong.</li>
                  <li>Linux primary, Windows supported; Android only to keep the fallback path honest.</li>
                  <li>One developer — work is phased, big-bang rewrites are rejected.</li>
                  <li>Nothing claimed without a scene or CI job that shows it.</li>
                </ul>
              </div>
              <div className="panel p-5">
                <MonoLabel className="text-primary">Deliberately not yet</MonoLabel>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  <li>A shipping engine for third parties: no marketplace, no scripting sandbox, no editor polish budget.</li>
                  <li>Multi-backend: the RHI is thin so a second backend is possible, not so it gets written now.</li>
                  <li>A feature checklist for its own sake — features land when a sandbox scene needs them.</li>
                </ul>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Read the reasoning in <DocLink href={links.idea}>IDEA.md</DocLink> and the order of work
              in <DocLink href={links.roadmap}>docs/ROADMAP.md</DocLink>.
            </p>
          </Section>

          <Section
            id="requirements"
            index="01"
            title="Requirements"
            summary="Anything else is not supported yet, and the engine does not pretend otherwise."
          >
            <KeyValue rows={requirements} />
          </Section>

          <Section
            id="build"
            index="02"
            title="Build"
            summary="Dependencies are vendored as submodules, so clone recursively. Setup.py fetches Slang; the presets handle the rest."
          >
            <CodeBlock
              caption="one-shot helper — setup, Ninja files, compile_commands"
              lines={[
                "git clone --recursive " + REPO,
                "cd UNHUMAN",
                "./GenerateProject.sh   # Windows: GenerateProject.bat",
                "cmake --build build -j",
              ]}
            />
            <CodeBlock
              caption="or drive CMake presets directly"
              lines={[
                "cmake --preset default",
                "cmake --build --preset default -j",
                "# artifacts land in bin/<cfg>-<sys>-x64-<sanitizers>/",
              ]}
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Debugging with clangd? Both paths symlink{" "}
              <span className="mono text-white/80">compile_commands.json</span> into the repository
              root. Sanitized binaries keep their own directory, so a sanitizer build never
              overwrites a normal one.
            </p>
          </Section>

          <Section
            id="presets"
            index="03"
            title="Presets"
            summary="Presets exist because mixing instrumented and clean objects in one build directory is a correctness bug. Use one directory per sanitizer; the build deletes stale objects when the flags change."
          >
            <Table head={["Preset", "Build dir", "Purpose"]} rows={presets} />
            <CodeBlock
              caption="pick a sanitizer without re-configuring"
              lines={[
                "cmake --preset sanitizer -DUHE_SANITIZER=address,undefined",
                "cmake --build --preset sanitizer -j",
                "cmake --preset sanitizer -DUHE_SANITIZER=none   # back to a plain build",
              ]}
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              ThreadSanitizer and MemorySanitizer must run alone; MemorySanitizer additionally needs
              Clang with an instrumented libc++.
            </p>
          </Section>

          <Section
            id="tests"
            index="04"
            title="Tests and profiling"
            summary="No-GPU unit tests are registered with CTest and built by default."
          >
            <CodeBlock
              caption="unit tests"
              lines={[
                "ctest -L unit              # or: ctest --test-dir build -L unit",
                "cmake --preset default -DUHE_TESTS=OFF   # skip building them",
              ]}
            />
            <KeyValue
              rows={[
                ["Tracy profiling", "On by default; disable with -DVG_PROFILE=OFF."],
                ["CI", "Builds Linux and Windows, runs a headless Lavapipe smoke test and the sanitizer workflows."],
                ["Acceptance test", "The sandbox application — layers such as TriangleTestLayer and ModelTestLayer exercise the renderer and editor."],
              ]}
            />
          </Section>

          <Section
            id="layout"
            index="05"
            title="Source layout"
            summary="One directory per subsystem, documented in-tree. Browse any row on GitHub."
          >
            <Table
              head={["Path", "Contents"]}
              rows={layout.map(([path, what]) => [
                <DocLink key={path} href={links.module(path.includes(" · ") ? path.split(" · ")[0] : path)}>
                  {path}
                </DocLink>,
                what,
              ])}
            />
          </Section>

          <Section
            id="libraries"
            index="06"
            title="Third-party"
            summary="Vendored as submodules and built from source; several are patched forks maintained alongside the engine. Slang is fetched by script/Setup.py."
          >
            <KeyValue rows={libraries} />
          </Section>

          <Section
            id="status"
            index="07"
            title="Status"
            summary="Snapshot taken from IDEA.md, dated 2026-09-13. Check the roadmap and issue tracker before relying on any row."
          >
            <Table head={["Area", "State"]} rows={status} />
          </Section>

          <Section
            id="contributing"
            index="08"
            title="Contributing"
            summary="The full rules live in CONTRIBUTING.md and CLA.md — this is the summary."
          >
            <ul className="space-y-3">
              {contributing.map((rule) => (
                <li key={rule} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mono mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                  {rule}
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Start with <DocLink href={links.contributing}>CONTRIBUTING.md</DocLink> and the{" "}
              <DocLink href={links.issues}>issue tracker</DocLink>.
            </p>
          </Section>

          <Section
            id="in-repo-docs"
            index="09"
            title="In-repo documentation"
            summary="The engine keeps its design docs next to the code. file:line references in them are snapshots — re-verify before acting."
          >
            <Table
              head={["File", "Covers"]}
              rows={inRepoDocs.map(([file, what]) => [
                <DocLink key={file} href={file.startsWith("docs/") || file === "IDEA.md" ? `${REPO}/blob/master/${file}` : file}>
                  {file}
                </DocLink>,
                what,
              ])}
            />
          </Section>

          <Section
            id="releases"
            index="10"
            title="Releases"
            summary="Pre-alpha tags only. Build from source unless you are specifically testing a release artifact."
          >
            <div className="flex flex-wrap gap-3">
              <a
                href={links.latestRelease}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded border border-primary/30 bg-primary/10 px-3.5 py-2 text-sm text-primary transition-colors hover:border-primary/60"
              >
                v0.01-alpha
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={links.releases}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded border border-white/[0.12] bg-white/[0.02] px-3.5 py-2 text-sm text-white transition-colors hover:border-white/25"
              >
                All releases
              </a>
              <a
                href={links.discord}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded border border-white/[0.12] bg-white/[0.02] px-3.5 py-2 text-sm text-white transition-colors hover:border-white/25"
              >
                Discord
              </a>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Licence: <DocLink href={links.license}>MIT</DocLink>. Contributions are covered by the{" "}
              <DocLink href={`${REPO}/blob/master/CLA.md`}>CLA</DocLink>.
            </p>
          </Section>
        </article>
      </div>
    </div>
  );
}
