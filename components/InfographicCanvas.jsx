"use client";

import { forwardRef, useMemo } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Layers, Zap, Activity } from "lucide-react";

const NODE_W = 210;
const NODE_H = 90;
const CANVAS_WIDTH = 800;

// Helper to get icon safely
function getIcon(name, emoji, color) {
    if (!name)
        return <span className="text-xl font-black">{emoji || "A"}</span>;

    const iconName = name.charAt(0).toUpperCase() + name.slice(1);
    const Icon = LucideIcons[iconName] || LucideIcons[name];

    if (Icon)
        return <Icon size={24} className="text-white" strokeWidth={2.5} />;

    // If name is short (like 'A', 'B'), treat as text
    if (name.length <= 2)
        return <span className="text-xl font-black">{name}</span>;

    return <span className="text-xl">{emoji || "●"}</span>;
}

const InfographicCanvas = forwardRef(({ data, fontClass, layoutMode }, ref) => {
    if (!data || !data.sections) return null;

    const { title, sections, theme, socialHandle } = data;
    const brandPrimary = theme?.primary || "#3b82f6";
    const brandDark = theme?.dark || "#0f172a";

    // Pre-calculate node positions for each section based on layoutType
    const sectionLayouts = useMemo(() => {
        return (sections || []).map((section) => {
            const nodes = section.nodes || [];
            const positions = {};
            // Allow global override via layoutMode, else fall back to section config or default
            const type = layoutMode || section.layoutType || "staggered";
            const canvasEffectiveWidth = CANVAS_WIDTH; // 800 - 96 (sidebar) = 704px

            // Layout calculations
            if (type === "horizontal") {
                const GAP_X = 25;
                const GAP_Y = 60;
                let maxPerRow = Math.floor(
                    (canvasEffectiveWidth + GAP_X) / (NODE_W + GAP_X),
                );
                if (maxPerRow < 1) maxPerRow = 1;

                nodes.forEach((node, idx) => {
                    const row = Math.floor(idx / maxPerRow);
                    const col = idx % maxPerRow;

                    // Center current row
                    const isLastRow =
                        row === Math.ceil(nodes.length / maxPerRow) - 1;
                    const itemsInThisRow = isLastRow
                        ? nodes.length % maxPerRow || maxPerRow
                        : maxPerRow;
                    const rowWidth =
                        itemsInThisRow * NODE_W + (itemsInThisRow - 1) * GAP_X;
                    const rowStartX = (canvasEffectiveWidth - rowWidth) / 2;

                    positions[node.id] = {
                        x: rowStartX + col * (NODE_W + GAP_X),
                        y: 60 + row * (NODE_H + GAP_Y),
                    };
                });
            } else if (type === "staggered") {
                const GAP_X = 20;
                const GAP_Y = 100;
                let maxPerRow = Math.floor(
                    (canvasEffectiveWidth + GAP_X) / (NODE_W + GAP_X),
                );
                if (maxPerRow < 1) maxPerRow = 1;

                nodes.forEach((node, idx) => {
                    const row = Math.floor(idx / maxPerRow);
                    const col = idx % maxPerRow;
                    const isEven = idx % 2 === 0;

                    const isLastRow =
                        row === Math.ceil(nodes.length / maxPerRow) - 1;
                    const itemsInThisRow = isLastRow
                        ? nodes.length % maxPerRow || maxPerRow
                        : maxPerRow;
                    const rowWidth =
                        itemsInThisRow * NODE_W + (itemsInThisRow - 1) * GAP_X;
                    const rowStartX = (canvasEffectiveWidth - rowWidth) / 2;

                    positions[node.id] = {
                        x: rowStartX + col * (NODE_W + GAP_X),
                        y: 60 + row * (NODE_H + GAP_Y) + (isEven ? 0 : 40),
                    };
                });
            } else if (type === "grid") {
                const cols = 2;
                const colWidth = canvasEffectiveWidth / cols;

                nodes.forEach((node, idx) => {
                    const col = idx % cols;
                    const row = Math.floor(idx / cols);

                    // Center in column
                    const x = col * colWidth + (colWidth - NODE_W) / 2;
                    const y = 50 + row * (NODE_H + 50);
                    positions[node.id] = { x, y };
                });
            } else {
                // Fallback flow
                nodes.forEach((node, idx) => {
                    positions[node.id] = {
                        x: 50 + idx * (NODE_W + 40),
                        y: 80,
                    };
                });
            }

            // Calculate Section Height
            let maxHeight = 250;
            if (type === "horizontal") {
                const GAP_Y = 60;
                const maxPerRow = Math.floor(
                    (canvasEffectiveWidth + 25) / (NODE_W + 25),
                );
                const rows = Math.ceil(nodes.length / (maxPerRow || 1));
                maxHeight = Math.max(250, 60 + rows * (NODE_H + GAP_Y) + 20);
            } else if (type === "staggered") {
                const GAP_Y = 100;
                const maxPerRow = Math.floor(
                    (canvasEffectiveWidth + 20) / (NODE_W + 20),
                );
                const rows = Math.ceil(nodes.length / (maxPerRow || 1));
                maxHeight = Math.max(250, 60 + rows * (NODE_H + GAP_Y) + 60);
            } else if (type === "grid") {
                const rows = Math.ceil(nodes.length / 2);
                maxHeight = Math.max(250, 50 + rows * (NODE_H + 50) + 50);
            }

            return { positions, height: maxHeight };
        });
    }, [sections, layoutMode]);

    return (
        <div
            ref={ref}
            className={`infographic-canvas w-[800px] shadow-2xl overflow-hidden ${fontClass || "font-sans"}`}
            style={{
                backgroundColor: theme?.mode === "dark" ? brandDark : "#ffffff",
                color: theme?.mode === "dark" ? "#ffffff" : "#0f172a",
            }}
        >
            {/* Header Block */}
            <div
                className="pt-14 pb-10 px-10 relative overflow-hidden transition-colors duration-500"
                style={{ backgroundColor: brandDark }}
            >
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Layers size={180} className="text-white -rotate-12" />
                </div>

                <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1 rounded-sm text-[10px] font-black tracking-[0.2em] text-white uppercase bg-blue-500 shadow-lg shadow-blue-500/50">
                            Architecture Blueprint
                        </div>
                    </div>

                    <h1 className="text-white text-5xl font-black uppercase tracking-tight leading-[0.9] max-w-3xl drop-shadow-sm">
                        {title}
                    </h1>

                    <div className="flex items-center gap-3 opacity-60">
                        <div className="w-8 h-0.5 bg-white rounded-full"></div>
                        <span className="text-white text-xs font-bold uppercase tracking-widest italic">
                            {socialHandle || "@AMAN-SENPAI"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Sections Container */}
            <div className="flex flex-col">
                {sections.map((section, sIdx) => {
                    const layout = sectionLayouts[sIdx];
                    if (!layout) return null;
                    const primaryColor = section.color || brandPrimary;

                    // Style matching screenshot: Solid dark color on left, light tinted background on right.
                    const contentBgColor =
                        theme?.mode === "dark"
                            ? `${primaryColor}15` // Dark mode tint
                            : `${primaryColor}15`; // Light mode tint

                    return (
                        <div
                            key={section.id || sIdx}
                            className="flex border-b border-white/50 relative overflow-hidden"
                        >
                            {/* Vertical Side Label */}
                            <div
                                className="w-24 flex-shrink-0 flex items-center justify-center relative overflow-hidden"
                                style={{ backgroundColor: primaryColor }}
                            >
                                <div
                                    className="text-white font-black uppercase tracking-widest text-lg whitespace-nowrap -rotate-90 select-none"
                                    style={{
                                        textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                    }}
                                >
                                    {section.title}
                                </div>
                                {/* Vertical dots decoration */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/10"></div>
                            </div>

                            {/* Diagram Space */}
                            <div
                                className="flex-1 relative overflow-hidden"
                                style={{
                                    backgroundColor: contentBgColor,
                                    minHeight: layout.height,
                                }}
                            >
                                {/* SVG Layer for Connections */}
                                <svg
                                    className="absolute inset-0 w-full h-full pointer-events-none"
                                    style={{ zIndex: 1 }}
                                >
                                    <defs>
                                        <marker
                                            id={`arrow-${sIdx}`}
                                            viewBox="0 0 10 10"
                                            refX="9"
                                            refY="5"
                                            markerWidth="6"
                                            markerHeight="6"
                                            orient="auto"
                                        >
                                            <path
                                                d="M 0 0 L 10 5 L 0 10 z"
                                                fill={primaryColor}
                                            />
                                        </marker>
                                    </defs>

                                    {section.connections?.map((conn, cIdx) => {
                                        const fromPos =
                                            layout.positions[conn.from];
                                        const toPos = layout.positions[conn.to];
                                        if (!fromPos || !toPos) return null;

                                        const isWrapped =
                                            toPos.y > fromPos.y + NODE_H * 0.5;
                                        let x1,
                                            y1,
                                            x2,
                                            y2,
                                            cp1x,
                                            cp1y,
                                            cp2x,
                                            cp2y;

                                        if (isWrapped) {
                                            // Connect Bottom -> Top
                                            x1 = fromPos.x + NODE_W / 2;
                                            y1 = fromPos.y + NODE_H;
                                            x2 = toPos.x + NODE_W / 2;
                                            y2 = toPos.y;

                                            cp1x = x1;
                                            cp1y = (y1 + y2) / 2;
                                            cp2x = x2;
                                            cp2y = (y1 + y2) / 2;
                                        } else {
                                            // Connect Right -> Left
                                            x1 = fromPos.x + NODE_W;
                                            y1 = fromPos.y + NODE_H / 2;
                                            x2 = toPos.x;
                                            y2 = toPos.y + NODE_H / 2;

                                            cp1x = (x1 + x2) / 2;
                                            cp1y = y1;
                                            cp2x = (x1 + x2) / 2;
                                            cp2y = y2;
                                        }

                                        const pathD = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;

                                        return (
                                            <g key={cIdx}>
                                                <path
                                                    d={pathD}
                                                    fill="none"
                                                    stroke={primaryColor}
                                                    strokeWidth="3"
                                                    strokeDasharray="6 4"
                                                    opacity="0.5"
                                                    markerEnd={`url(#arrow-${sIdx})`}
                                                />
                                                {conn.label && (
                                                    <g
                                                        transform={`translate(${(x1 + x2) / 2}, ${(y1 + y2) / 2 - 15})`}
                                                    >
                                                        <rect
                                                            x="-30"
                                                            y="-10"
                                                            width="60"
                                                            height="20"
                                                            rx="4"
                                                            fill={
                                                                theme?.mode ===
                                                                "dark"
                                                                    ? brandDark
                                                                    : "white"
                                                            }
                                                            fillOpacity="0.8"
                                                        />
                                                        <text
                                                            dy="4"
                                                            textAnchor="middle"
                                                            fill={primaryColor}
                                                            fontSize="9"
                                                            fontWeight="800"
                                                            className="uppercase"
                                                        >
                                                            {conn.label}
                                                        </text>
                                                    </g>
                                                )}
                                            </g>
                                        );
                                    })}
                                </svg>

                                {/* Nodes Container */}
                                <div className="relative w-full h-full z-10">
                                    {section.nodes?.map((node, nIdx) => {
                                        const pos = layout.positions[node.id];
                                        if (!pos) return null;

                                        return (
                                            <motion.div
                                                key={node.id}
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.9,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    delay: nIdx * 0.1,
                                                }}
                                                className="absolute bg-white dark:bg-slate-800 rounded-xl flex items-center p-4 gap-4"
                                                style={{
                                                    left: pos.x,
                                                    top: pos.y,
                                                    width: NODE_W,
                                                    height: NODE_H,
                                                    boxShadow: `0 8px 20px -6px ${primaryColor}40`,
                                                }}
                                            >
                                                <div
                                                    className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
                                                    style={{
                                                        backgroundColor: `${primaryColor}15`,
                                                    }}
                                                >
                                                    <div
                                                        className="font-black text-lg"
                                                        style={{
                                                            color: primaryColor,
                                                        }}
                                                    >
                                                        {getIcon(
                                                            node.icon,
                                                            null,
                                                            primaryColor,
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex flex-col min-w-0 justify-center">
                                                    <span
                                                        className="text-[9px] uppercase font-black tracking-widest mb-1 opacity-60"
                                                        style={{
                                                            color: primaryColor,
                                                        }}
                                                    >
                                                        Node
                                                    </span>
                                                    <span className="text-sm font-black text-slate-800 dark:text-white leading-tight line-clamp-2">
                                                        {node.label}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer / Legend */}
            <div className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 p-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col">
                            <Activity
                                size={20}
                                className="text-slate-300 mb-1"
                            />
                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                                Architect
                            </span>
                        </div>

                        <div className="h-8 w-[1px] bg-slate-100 dark:bg-slate-800"></div>

                        {sections.map((s, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded shadow-sm"
                                    style={{ backgroundColor: s.color }}
                                ></div>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                    {s.title}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 opacity-40">
                        <Zap size={14} fill="currentColor" />
                        <span className="text-[9px] font-black uppercase tracking-widest">
                            ByteGen Engine
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default InfographicCanvas;
