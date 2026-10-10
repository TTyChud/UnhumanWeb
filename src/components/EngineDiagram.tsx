/**
 * Frame-pipeline schematic. Nodes and edges mirror real names in
 * UHE/src (Application · LayerStack · Scene · Jobsystem · Physics ·
 * Renderer3D · Platform/Vulkan). The render-graph node is dashed because the
 * in-tree state is still "in progress" — see docs/ROADMAP.md.
 */
const INK = "#e6e9ec";
const MUTED = "#8b939c";
const LINE = "rgba(255,255,255,0.14)";
const SURFACE = "rgba(255,255,255,0.03)";
const ACCENT = "#c3f53c";
const AMBER = "#ffb454";

const nodes = [
  { x: 76, title: "Application", sub: "LayerStack · events" },
  { x: 222, title: "Scene", sub: "entt ECS · components" },
  { x: 368, title: "Task graph", sub: "job system workers" },
  { x: 514, title: "Renderer 2D/3D", sub: "camera · lights · SSAO" },
  { x: 660, title: "Vulkan RHI", sub: "volk · VMA · descriptors" },
  { x: 806, title: "Swapchain", sub: "frame context · fences" },
];

const rail = [
  { x: 76, title: "ImGui editor", sub: "dock · gizmos · drag-drop" },
  { x: 308, title: "Physics step", sub: "Jolt (3D) · Box2D (2D)" },
  { x: 540, title: "Tracy · spdlog", sub: "instrumentation" },
  { x: 772, title: "sandbox · tests/", sub: "ModelTestLayer · ctest -L unit" },
];

const NODE_W = 124;
const NODE_H = 54;
const RAIL_W = 212;

function Arrow({ from, to }: { from: number; to: number }) {
  return (
    <g stroke={LINE} strokeWidth="1" fill="none">
      <path d={`M${from} 118 H${to - 6}`} />
      <path d={`M${to - 9} 115 L${to} 118 L${to - 9} 121`} stroke={ACCENT} strokeOpacity="0.7" />
    </g>
  );
}

export default function EngineDiagram() {
  return (
    <div className="overflow-x-auto">
      <svg
        viewBox="0 0 1000 350"
        role="img"
        aria-label="Frame pipeline: Application and LayerStack feed the entt Scene, whose bodies are stepped by Jolt and Box2D; the task graph drives Renderer2D/3D, shaders come from Slang, and the Vulkan RHI presents through the swapchain. Editor, physics, Tracy and the sandbox tests hang off the same loop; the render graph is in progress."
        className="min-w-[760px] w-full"
        style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
      >
        {/* frame */}
        <rect x="0.5" y="0.5" width="999" height="349" fill="none" stroke={LINE} strokeDasharray="2 6" />

        {/* lane labels */}
        <text x="16" y="52" fill={MUTED} fontSize="10" letterSpacing="1.5">
          FRAME
        </text>
        <text x="16" y="250" fill={MUTED} fontSize="10" letterSpacing="1.5">
          SIM
        </text>
        <text x="16" y="264" fill={MUTED} fontSize="10" letterSpacing="1.5">
          TOOLS
        </text>

        {/* main chain */}
        {nodes.map((node, i) => (
          <g key={node.title}>
            <rect
              x={node.x}
              y="92"
              width={NODE_W}
              height={NODE_H}
              rx="3"
              fill={SURFACE}
              stroke={i === nodes.length - 1 ? ACCENT : LINE}
              strokeOpacity={i === nodes.length - 1 ? 0.45 : 1}
            />
            <text x={node.x + 12} y="116" fill={INK} fontSize="11.5">
              {node.title}
            </text>
            <text x={node.x + 12} y="132" fill={MUTED} fontSize="9.5">
              {node.sub}
            </text>
            {i < nodes.length - 1 ? <Arrow from={node.x + NODE_W} to={nodes[i + 1].x} /> : null}
          </g>
        ))}

        {/* shader path into the renderer */}
        <g>
          <rect x="498" y="20" width="152" height="44" rx="3" fill={SURFACE} stroke={LINE} />
          <text x="510" y="40" fill={INK} fontSize="11">
            Slang → SPIR-V
          </text>
          <text x="510" y="55" fill={MUTED} fontSize="9.5">
            runtime compile
          </text>
          <path d="M574 64 V92" stroke={LINE} fill="none" />
          <path d="M571 87 L574 92 L577 87" stroke={ACCENT} strokeOpacity="0.7" fill="none" />
        </g>

        {/* asset feed into the scene */}
        <g>
          <rect x="206" y="20" width="152" height="44" rx="3" fill={SURFACE} stroke={LINE} />
          <text x="218" y="40" fill={INK} fontSize="11">
            glTF · YAML
          </text>
          <text x="218" y="55" fill={MUTED} fontSize="9.5">
            fastgltf · yaml-cpp
          </text>
          <path d="M282 64 V92" stroke={LINE} fill="none" />
          <path d="M279 87 L282 92 L285 87" stroke={ACCENT} strokeOpacity="0.7" fill="none" />
        </g>

        {/* render graph, explicitly in progress */}
        <g>
          <rect
            x="812"
            y="162"
            width="172"
            height="44"
            rx="3"
            fill="none"
            stroke={AMBER}
            strokeOpacity="0.5"
            strokeDasharray="4 4"
          />
          <text x="824" y="182" fill={INK} fontSize="11">
            Render graph
          </text>
          <text x="824" y="197" fill={AMBER} fontSize="9.5">
            in progress
          </text>
          <path d="M722 146 V184 H812" stroke={LINE} fill="none" strokeDasharray="3 4" />
        </g>

        {/* simulation + tooling rail */}
        <g>
          {rail.map((item) => (
            <g key={item.title}>
              <rect x={item.x} y="232" width={RAIL_W} height="44" rx="3" fill={SURFACE} stroke={LINE} />
              <text x={item.x + 12} y="252" fill={INK} fontSize="11">
                {item.title}
              </text>
              <text x={item.x + 12} y="267" fill={MUTED} fontSize="9.5">
                {item.sub}
              </text>
              <path
                d={`M${item.x + RAIL_W / 2} 232 V216`}
                stroke={LINE}
                fill="none"
                strokeDasharray="3 4"
              />
            </g>
          ))}
          {/* rail bus, tied back into the frame lane */}
          <path d="M182 216 H878" stroke={LINE} fill="none" strokeDasharray="3 4" />
          <path d="M430 216 V152" stroke={LINE} fill="none" strokeDasharray="3 4" />
        </g>

        {/* legend */}
        <g fontSize="9.5" fill={MUTED}>
          <path d="M16 320 h22" stroke={ACCENT} strokeOpacity="0.7" />
          <text x="44" y="323">frame path</text>
          <path d="M136 320 h22" stroke={LINE} strokeDasharray="3 4" />
          <text x="164" y="323">simulation, tooling, in progress</text>
        </g>
      </svg>
    </div>
  );
}
