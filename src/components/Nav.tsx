import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MonoLabel } from "@/components/kit";
import { BUILD, links } from "@/lib/site";

const sections = [
  { to: "/#architecture", label: "Engine" },
  { to: "/docs", label: "Docs" },
];

function navItemClass({ isActive }: { isActive: boolean }) {
  return cn(
    "mono-label transition-colors hover:text-white",
    isActive ? "text-primary" : "text-muted-foreground"
  );
}

export function Nav() {
  const { pathname } = useLocation();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-5 md:px-8">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Unhuman Engine home">
          <img src="/icon.png" alt="" className="h-7 w-auto opacity-95" />
          <span className="flex items-baseline gap-1.5">
            <span className="text-[15px] font-semibold tracking-tight text-white">unhuman</span>
            <MonoLabel className="text-primary/80">engine</MonoLabel>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-5">
          {sections.map((section) =>
            section.to.startsWith("/#") ? (
              <a
                key={section.to}
                href={pathname === "/" ? section.to.slice(1) : section.to}
                className="mono-label hidden transition-colors hover:text-white md:inline"
              >
                {section.label}
              </a>
            ) : (
              <NavLink key={section.to} to={section.to} className={navItemClass}>
                {section.label}
              </NavLink>
            )
          )}

          <a
            href={links.repo}
            target="_blank"
            rel="noreferrer"
            className="mono-label hidden transition-colors hover:text-white md:inline"
          >
            GitHub
          </a>

          <a
            href={links.releases}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-primary transition-colors hover:border-primary/60 hover:bg-primary/15"
          >
            <MonoLabel className="text-primary">{BUILD.version}</MonoLabel>
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
          </a>
        </div>
      </nav>
    </header>
  );
}
