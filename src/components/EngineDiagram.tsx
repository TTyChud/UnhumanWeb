/**
 * Frame-pipeline schematic. Nodes mirror real names in UHE/src (Application ·
 * LayerStack · Scene · Jobsystem · Physics · Renderer3D · Platform/Vulkan).
 * The render-graph slot is dashed because the backend is still a stub —
 * see docs/README.md ("Code state the documents assume").
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

/* Bottom row: what feeds or hangs off the loop. The last slot is the gap. */
const row = [
  { x: 76, title: "Physics step", sub: "Jolt (3D) · Box2D (2D)" },
  { x: 308, title: "ImGui editor", sub: "dock · gizmos · drag-drop" },
  { x: 540, title: "sandbox · tests/", sub: "ModelTestLayer · ctest -L unit" },
];

const NODE_W = 124;
const NODE_H = 54;
const SLOT_W = 212;

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
        viewBox="0 0 1000 268"
        role="img"
        aria-label="Engine loop: Application and LayerStack feed the entt Scene, the task graph drives Renderer2D/3D, shaders come from Slang, and the Vulkan RHI presents through the swapchain. Physics stepping (Jolt 3D, Box2D 2D), the ImGui editor and the sandbox tests hang off the same loop; the render graph is still a stub."
        className="min-w-[760px] w-full"
        style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
      >
        <rect x="0.5" y="0.5" width="999" height="267" fill="none" stroke={LINE} strokeDasharray="2 6" />

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
            {i < nodes.length - 1 ? (
              <Arrow from={node.x + NODE_W} to={nodes[i + 1].x} />
            ) : null}
          </g>
        ))}

        {/* shader path into the renderer */}
        <g>
          <rect x="498" y="16" width="152" height="44" rx="3" fill={SURFACE} stroke={LINE} />
          <text x="510" y="36" fill={INK} fontSize="11">
            Slang → SPIR-V
          </text>
          <text x="510" y="51" fill={MUTED} fontSize="9.5">
            runtime compile
          </text>
          <path d="M574 60 V92" stroke={LINE} fill="none" />
          <path d="M571 87 L574 92 L577 87" stroke={ACCENT} strokeOpacity="0.7" fill="none" />
        </g>

        {/* row that feeds / hangs off the loop */}
        <g>
          {row.map((item) => (
            <g key={item.title}>
              <rect x={item.x} y="196" width={SLOT_W} height="44" rx="3" fill={SURFACE} stroke={LINE} />
              <text x={item.x + 12} y="216" fill={INK} fontSize="11">
                {item.title}
              </text>
              <text x={item.x + 12} y="231" fill={MUTED} fontSize="9.5">
                {item.sub}
              </text>
              <path d={`M${item.x + SLOT_W / 2} 196 V180`} stroke={LINE} fill="none" strokeDasharray="3 4" />
            </g>
          ))}
          <path d="M182 180 H646" stroke={LINE} fill="none" strokeDasharray="3 4" />
          <path d="M430 180 V152" stroke={LINE} fill="none" strokeDasharray="3 4" />

          {/* the gap: render graph backend */}
          <rect
            x="772"
            y="196"
            width="212"
            height="44"
            rx="3"
            fill="none"
            stroke={AMBER}
            strokeOpacity="0.5"
            strokeDasharray="4 4"
          />
          <text x="784" y="216" fill={INK} fontSize="11">
            Render graph
          </text>
          <text x="784" y="231" fill={AMBER} fontSize="9.5">
            coming soon · stub in tree
          </text>
        </g>
      </svg>
    </div>
  );
}
