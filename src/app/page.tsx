
"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Atom,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Compass,
  Gauge,
  Globe2,
  Info,
  Menu,
  Orbit,
  Pause,
  Play,
  Radio,
  RefreshCcw,
  Rocket,
  Satellite,
  ShieldCheck,
  Sparkles,
  Telescope,
  Timer,
  X,
  Zap,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  planets,
  cosmicObjects,
  missions,
  questions,
  type Planet,
  type CosmicObject,
} from "@/data/space";

const PlanetScene = dynamic(
  () => import("@/components/PlanetScene"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[360px] md:h-[510px] flex items-center justify-center text-cyan-300 text-xs tracking-[0.2em] animate-pulse">
        INITIALIZING 3D OBSERVATORY...
      </div>
    ),
  }
);

const links = [
  ["Home", "home"],
  ["Solar System", "solar-system"],
  ["Universe", "universe"],
  ["Space Missions", "missions"],
  ["Calculator", "calculator"],
  ["About", "about"],
] as const;

const navigate = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const fmt = (value: number, digits = 0) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(value);

function Tag({
  children,
  live = false,
}: {
  children: React.ReactNode;
  live?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-2 text-[10px] md:text-xs font-mono tracking-[0.2em] text-cyan-300 uppercase">
      <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-emerald-400 animate-pulse" : "bg-cyan-400"}`} />
      {children}
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl mb-10 md:mb-14">
      <Tag>{eyebrow}</Tag>
      <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.045em] text-white leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-slate-400 leading-7 mt-5 text-sm md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function Starfield() {
  return (
    <div className="starfield" aria-hidden="true">
      <div className="stars-layer stars-one" />
      <div className="stars-layer stars-two" />
      <div className="nebula nebula-one" />
      <div className="nebula nebula-two" />
    </div>
  );
}

function Navbar() {
  const [opened, setOpened] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-[#030712]/85 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-[76px] flex items-center justify-between gap-5">
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-3 text-left shrink-0"
          aria-label="Cosmic Explorer home"
        >
          <span className="h-10 w-10 rounded-xl border border-cyan-400/40 bg-cyan-400/10 flex items-center justify-center text-cyan-300">
            <Orbit size={23} />
          </span>
          <span>
            <strong className="block text-white text-sm tracking-[0.18em]">
              COSMIC
            </strong>
            <span className="block text-[9px] tracking-[0.35em] text-cyan-400">
              EXPLORER
            </span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
          {links.map(([name, id]) => (
            <button
              key={id}
              onClick={() => navigate(id)}
              className="text-[12px] text-slate-400 hover:text-cyan-300 transition-colors"
            >
              {name}
            </button>
          ))}
        </nav>

        <div className="hidden sm:flex gap-2 items-center font-mono text-[10px] tracking-widest text-emerald-300 border border-emerald-400/20 bg-emerald-400/5 px-3 py-2 rounded-full">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          SYSTEM ONLINE
        </div>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpened(!opened)}
          aria-label={opened ? "Close menu" : "Open menu"}
          aria-expanded={opened}
        >
          {opened ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {opened && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-t border-white/10 bg-[#080e20]"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {links.map(([name, id]) => (
                <button
                  key={id}
                  onClick={() => {
                    setOpened(false);
                    navigate(id);
                  }}
                  className="text-left text-sm text-slate-200 py-3 border-b border-white/5"
                >
                  {name}
                </button>
              ))}
              <button
                onClick={() => {
                  setOpened(false);
                  navigate("quiz");
                }}
                className="text-left text-sm text-cyan-300 py-3"
              >
                Discovery Quiz
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Tag live>EXPLORATION SYSTEM: ONLINE</Tag>

            <div className="mt-7 inline-flex gap-2 items-center text-[11px] uppercase tracking-widest text-slate-400 border border-white/10 rounded-full px-4 py-2 bg-white/[0.03]">
              <Sparkles size={12} className="text-purple-400" />
              Welcome to the observatory
            </div>

            <h1 className="mt-7 text-[clamp(3.4rem,7.5vw,7.5rem)] leading-[0.95] font-bold tracking-[-0.075em] text-white">
              COSMIC
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500">
                EXPLORER.
              </span>
            </h1>

            <p className="mt-7 text-xl md:text-2xl font-light text-slate-200 tracking-tight">
              Beyond Earth. Beyond Imagination.
            </p>

            <p className="mt-5 max-w-xl text-slate-400 text-sm md:text-base leading-8">
              Explore distant worlds, uncover cosmic mysteries, and
              experience the universe like never before. Your journey
              through the cosmos starts here.
            </p>

            <div className="flex flex-wrap gap-3 mt-9">
              <button
                onClick={() => navigate("solar-system")}
                className="primary-btn"
              >
                BEGIN EXPLORATION <ArrowRight size={17} />
              </button>
              <button
                onClick={() => navigate("solar-system")}
                className="secondary-btn"
              >
                <Orbit size={17} /> EXPLORE SOLAR SYSTEM
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-14 max-w-lg pt-7 border-t border-white/10">
              {[
                ["08", "PLANETS"],
                ["05", "COSMIC OBJECTS"],
                ["07", "MISSIONS"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-2xl md:text-3xl font-semibold text-white">
                    {value}
                  </p>
                  <p className="text-[9px] md:text-[10px] tracking-[0.15em] text-slate-500 mt-2">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative min-w-0"
          >
            <div className="absolute inset-[15%] rounded-full bg-blue-500/15 blur-[80px] pointer-events-none" />
            <div className="absolute inset-[5%] rounded-full border border-cyan-400/10 pointer-events-none" />
            <div className="absolute inset-[13%] rounded-full border border-dashed border-white/10 pointer-events-none" />

            <PlanetScene planet={planets[2]} />

            <div className="absolute top-8 right-0 glass-panel p-3 md:p-4 pointer-events-none">
              <p className="text-[9px] tracking-widest text-cyan-400 font-mono">TARGET LOCKED</p>
              <p className="text-sm font-semibold mt-1">EARTH / SOL-03</p>
            </div>

            <div className="absolute bottom-5 left-0 glass-panel px-4 py-3 pointer-events-none">
              <p className="text-[9px] tracking-widest text-slate-400 font-mono">
                OBSERVATION MODE
              </p>
              <p className="text-sm text-emerald-300 mt-1 flex gap-2 items-center">
                <Radio size={13} /> ACTIVE
              </p>
            </div>
          </motion.div>
        </div>

        <button
          className="mt-8 flex items-center gap-2 text-xs font-mono tracking-widest text-slate-500 hover:text-cyan-300"
          onClick={() => navigate("solar-system")}
        >
          SCROLL TO DISCOVER <ChevronDown size={15} />
        </button>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.025]">
      <p className="text-[10px] uppercase tracking-widest text-slate-500">{label}</p>
      <p className="text-white text-sm md:text-base font-medium mt-3 break-words">
        {value}
      </p>
    </div>
  );
}

const planetColors: Record<string, string> = Object.fromEntries(
  planets.map((p) => [p.name, p.color])
);

function PlanetComparison() {
  const [first, setFirst] = useState("Earth");
  const [second, setSecond] = useState("Mars");
  const [metric, setMetric] = useState<
    "diameter" | "gravity" | "temp" | "distance" | "orbitalDays"
  >("diameter");

  const a = planets.find((p) => p.name === first)!;
  const b = planets.find((p) => p.name === second)!;

  const options = [
    { key: "diameter", label: "Diameter", unit: "km" },
    { key: "gravity", label: "Gravity", unit: "m/s²" },
    { key: "temp", label: "Temperature", unit: "°C" },
    { key: "distance", label: "Solar Distance", unit: "million km" },
    { key: "orbitalDays", label: "Orbital Period", unit: "days" },
  ] as const;

  const selectedMetric = options.find((o) => o.key === metric)!;

  const data = [
    { name: first, value: a[metric] },
    { name: second, value: b[metric] },
  ];

  return (
    <div className="glass-panel p-5 md:p-8 mt-8">
      <div className="flex flex-wrap justify-between gap-4 items-center mb-6">
        <div>
          <Tag>COMPARATIVE ANALYSIS</Tag>
          <h3 className="text-2xl font-semibold mt-3">Planet Comparison</h3>
        </div>
        <span className="text-xs text-slate-500">SELECT TWO WORLDS</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="field-label">
          PLANET A
          <select
            className="space-input"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
          >
            {planets.map((p) => (
              <option key={p.name}>{p.name}</option>
            ))}
          </select>
        </label>

        <label className="field-label">
          PLANET B
          <select
            className="space-input"
            value={second}
            onChange={(e) => setSecond(e.target.value)}
          >
            {planets.map((p) => (
              <option key={p.name}>{p.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        {options.map((o) => (
          <button
            key={o.key}
            onClick={() => setMetric(o.key)}
            className={`chip ${metric === o.key ? "chip-active" : ""}`}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className="mt-8 h-[260px] md:h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 10, right: 25 }}>
            <CartesianGrid stroke="#243044" strokeDasharray="3 7" horizontal={false} />
            <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis
              dataKey="name"
              type="category"
              width={75}
              tick={{ fill: "#cbd5e1", fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => [`${fmt(Number(value), 2)} ${selectedMetric.unit}`, selectedMetric.label]}
              contentStyle={{
                background: "#0b1120",
                border: "1px solid #334155",
                borderRadius: 12,
                color: "#f8fafc",
              }}
            />
            <Bar dataKey="value" fill="#22d3ee" radius={[0, 8, 8, 0]} maxBarSize={42} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-slate-500 mt-4">
        {selectedMetric.label} ({selectedMetric.unit}). Values are approximate;
        negative temperatures are shown on a signed scale.
      </p>
    </div>
  );
}

function SolarSystem() {
  const [selected, setSelected] = useState<Planet>(planets[2]);

  return (
    <section id="solar-system" className="section-wrap">
      <SectionTitle
        eyebrow="01 / PLANETARY EXPLORATION"
        title="Discover our solar system."
        description="Eight remarkable planets orbit our star. Select a world, examine a rotating 3D model and investigate its physical properties."
      />

      <div className="glass-panel p-4 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
          <Tag live>SOLAR SYSTEM NAVIGATION</Tag>
          <p className="text-[10px] tracking-widest text-slate-500 font-mono">
            ARTISTIC SCALE / NOT TO SCALE
          </p>
        </div>

        <div className="relative overflow-x-auto pb-4">
          <div className="flex items-center gap-4 min-w-[760px]">
            <div className="flex flex-col items-center shrink-0 gap-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-200 via-orange-500 to-amber-700 shadow-[0_0_45px_#f59e0b70]" />
              <span className="text-[10px] text-slate-400">Sun</span>
            </div>
            <div className="h-px bg-white/10 w-7 shrink-0" />
            {planets.map((planet, i) => (
              <button
                key={planet.name}
                onClick={() => setSelected(planet)}
                className={`relative flex flex-col items-center justify-center gap-3 shrink-0 px-1 py-3 rounded-xl transition-all ${
                  selected.name === planet.name ? "bg-cyan-400/10" : "hover:bg-white/5"
                }`}
                aria-pressed={selected.name === planet.name}
              >
                <span
                  className="rounded-full block border border-white/20"
                  style={{
                    width: i >= 4 && i <= 7 ? 39 : i === 2 ? 30 : 24,
                    height: i >= 4 && i <= 7 ? 39 : i === 2 ? 30 : 24,
                    background: `radial-gradient(circle at 28% 22%, ${planet.color}, ${planet.secondary}, #101827)`,
                    boxShadow:
                      selected.name === planet.name
                        ? `0 0 24px ${planet.color}70`
                        : "none",
                  }}
                />
                <span className={`text-[10px] ${selected.name === planet.name ? "text-cyan-300" : "text-slate-400"}`}>
                  {planet.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6 mt-7 pt-7 border-t border-white/10 items-center">
          <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-[#030712]">
            <PlanetScene planet={selected} compact />
            <div className="absolute bottom-4 left-4 pointer-events-none">
              <p className="text-[10px] font-mono text-cyan-300 tracking-widest">3D OBSERVATION</p>
              <p className="text-xs text-slate-400 mt-1">Drag to rotate · Scroll to zoom</p>
            </div>
          </div>

          <div>
            <Tag>PLANETARY DATABASE / SOL</Tag>
            <h3 className="text-5xl font-semibold mt-4 mb-2 tracking-tight">
              {selected.name}
            </h3>
            <p className="text-cyan-300 text-sm">{selected.type}</p>
            <p className="text-sm text-slate-400 mt-5 leading-7">
              {selected.fact}
            </p>

            <div className="grid grid-cols-2 gap-3 mt-7">
              <Metric label="Diameter" value={`${fmt(selected.diameter)} km`} />
              <Metric label="From the Sun" value={`${fmt(selected.distance, 1)} M km`} />
              <Metric label="Rotation period" value={selected.day} />
              <Metric label="Orbital period" value={selected.year} />
              <Metric label="Mean temperature" value={`${selected.temp} °C`} />
              <Metric label="Known moons*" value={String(selected.moons)} />
              <Metric label="Gravity" value={`${selected.gravity} m/s²`} />
              <Metric label="Planet class" value={selected.type} />
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-7 leading-6">
          *Known moon counts: 2026 snapshot. Mean temperatures, dimensions and
          orbital properties are rounded; distance means approximate mean orbital
          distance from the Sun. Day values are approximate rotation periods,
          not always solar days.
        </p>
      </div>

      <PlanetComparison />
    </section>
  );
}

function Universe() {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<CosmicObject | null>(null);

  const categories = ["All", "Star", "Galaxy", "Nebula", "Black hole", "Exoplanet"];
  const visible = cosmicObjects.filter(
    (item) => category === "All" || item.category === category
  );

  return (
    <section id="universe" className="section-wrap">
      <SectionTitle
        eyebrow="02 / DEEP SPACE ARCHIVE"
        title="The universe is calling."
        description="Travel beyond our planetary neighborhood. Investigate galaxies, stellar nurseries, black holes and worlds beyond the Sun."
      />

      <div className="flex gap-2 flex-wrap mb-7">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`chip ${category === c ? "chip-active" : ""}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((object) => (
          <motion.button
            layout
            whileHover={{ y: -5 }}
            key={object.name}
            onClick={() => setActive(object)}
            className="glass-panel overflow-hidden text-left group"
          >
            <div className="h-48 relative overflow-hidden bg-[#0e1930]">
              <img
                src={object.image}
                alt={`Illustrative space imagery for ${object.category.toLowerCase()} category`}
                loading="lazy"
                className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] to-transparent" />
              <span className="absolute bottom-4 left-5 text-xs uppercase text-cyan-300 tracking-widest">
                {object.category}
              </span>
            </div>
            <div className="p-6">
              <div className="flex justify-between gap-3">
                <h3 className="text-xl font-semibold">{object.name}</h3>
                <ArrowUpRight className="text-cyan-300 shrink-0" size={20} />
              </div>
              <p className="text-sm text-slate-400 mt-3">{object.detail}</p>
              <p className="text-xs font-mono text-slate-500 mt-5">
                DISTANCE: {object.distance}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <p className="text-xs text-slate-500 mt-5">
        Visuals in this archive are illustrative stock space imagery, not verified
        telescope images of the named objects.
      </p>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex justify-center items-center p-5 bg-black/80 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setActive(null);
            }}
            role="presentation"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${active.name} information`}
              initial={{ y: 30, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="glass-panel max-w-xl w-full p-6 md:p-9 relative"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-5 right-5 p-2 rounded-lg hover:bg-white/10"
                aria-label="Close details"
                autoFocus
              >
                <X size={21} />
              </button>
              <Tag>ASTRONOMICAL RECORD</Tag>
              <h3 className="text-3xl font-semibold mt-5 pr-8">{active.name}</h3>
              <p className="text-cyan-300 mt-2">{active.detail}</p>
              <div className="grid grid-cols-2 gap-3 mt-7">
                <Metric label="Classification" value={active.category} />
                <Metric label="Distance from Earth" value={active.distance} />
              </div>
              <p className="text-slate-300 mt-7 leading-8">{active.fact}</p>
              <button
                className="secondary-btn mt-8"
                onClick={() => setActive(null)}
              >
                CLOSE ARCHIVE <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/*
  Educational model:
  Each planetary location is assigned a mean heliocentric radius.
  Two planetary locations use |r1-r2| as a nominal aligned-orbit
  separation, NOT the true Earth/planet-to-planet distance.
  Proxima Centauri is represented by its approximate distance
  from the Sun (4.2465 light-years).
*/

const travelPoints = [
  { name: "Earth", radius: 149.6 },
  { name: "Mars", radius: 227.9 },
  { name: "Jupiter", radius: 778.6 },
  { name: "Saturn", radius: 1433.5 },
  { name: "Neptune", radius: 4495.1 },
  { name: "Proxima Centauri", radius: 4.2465 * 9_460_730 },
];

const speeds = [
  { label: "28,000 km/h", value: "28000" },
  { label: "100,000 km/h", value: "100000" },
  { label: "500,000 km/h", value: "500000" },
  { label: "Custom speed", value: "custom" },
];

function Calculator() {
  const [from, setFrom] = useState("Earth");
  const [to, setTo] = useState("Mars");
  const [speedMode, setSpeedMode] = useState("100000");
  const [custom, setCustom] = useState("150000");
  const [result, setResult] = useState<{
    distance: number;
    hours: number;
    speed: number;
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const speed = speedMode === "custom" ? Number(custom) : Number(speedMode);

    if (from === to) {
      setError("Choose two different locations.");
      return;
    }

    if (!Number.isFinite(speed) || speed <= 0 || speed > 1_079_252_848.8) {
      setError("Enter a positive speed no greater than the speed of light.");
      return;
    }

    const source = travelPoints.find((p) => p.name === from);
    const dest = travelPoints.find((p) => p.name === to);

    if (!source || !dest) {
      setError("Please select valid locations.");
      return;
    }

    const distance = Math.abs(dest.radius - source.radius);

    if (distance <= 0) {
      setError("Unable to calculate a positive distance.");
      return;
    }

    setResult({
      distance: distance * 1_000_000,
      hours: (distance * 1_000_000) / speed,
      speed,
    });
  };

  return (
    <section id="calculator" className="section-wrap">
      <SectionTitle
        eyebrow="03 / NAVIGATION LABORATORY"
        title="How far would you go?"
        description="Choose a destination and calculate a simplified straight-line journey. Discover the astonishing scale of interplanetary and interstellar distances."
      />

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="glass-panel p-6 md:p-8">
          <Tag>TRAJECTORY INPUT</Tag>
          <h3 className="text-2xl font-semibold mt-4">Configure your journey</h3>

          <div className="mt-7 grid sm:grid-cols-2 gap-4">
            <label className="field-label">
              STARTING LOCATION
              <select
                value={from}
                onChange={(e) => { setFrom(e.target.value); setResult(null); }}
                className="space-input"
              >
                {travelPoints.slice(0, 5).map((p) => (
                  <option key={p.name}>{p.name}</option>
                ))}
              </select>
            </label>

            <label className="field-label">
              DESTINATION
              <select
                value={to}
                onChange={(e) => { setTo(e.target.value); setResult(null); }}
                className="space-input"
              >
                {travelPoints.slice(1).map((p) => (
                  <option key={p.name}>{p.name}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="field-label block mt-5">
            SPACECRAFT SPEED
            <select
              value={speedMode}
              onChange={(e) => { setSpeedMode(e.target.value); setResult(null); }}
              className="space-input"
            >
              {speeds.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </label>

          {speedMode === "custom" && (
            <label className="field-label block mt-5">
              CUSTOM SPEED (KM/H)
              <input
                type="number"
                min="0.001"
                max="1079252848.8"
                value={custom}
                onChange={(e) => { setCustom(e.target.value); setResult(null); }}
                className="space-input"
                placeholder="Enter speed in km/h"
              />
            </label>
          )}

          {error && (
            <div role="alert" className="mt-5 text-sm text-rose-300 bg-rose-500/10 rounded-xl p-3">
              {error}
            </div>
          )}

          <button onClick={calculate} className="primary-btn mt-7 w-full justify-center">
            <Zap size={17} /> CALCULATE JOURNEY
          </button>

          <div className="mt-7 p-4 rounded-xl border border-cyan-400/15 bg-cyan-400/[0.03]">
            <div className="flex gap-2 items-center text-cyan-300 text-xs">
              <Info size={15} /> SIMPLIFIED SCIENTIFIC MODEL
            </div>
            <p className="text-xs text-slate-400 mt-3 leading-6">
              Distances use differences between mean orbital radii, representing
              a nominal radial alignment, not real-time planetary positions.
              Proxima Centauri is treated as a fixed interstellar reference.
              No acceleration, fuel, gravity assists, orbital paths, relativistic
              effects or trajectory constraints are included.
            </p>
          </div>
        </div>

        <div className="glass-panel p-6 md:p-8 flex flex-col">
          <Tag live>FLIGHT ESTIMATION</Tag>
          <h3 className="text-2xl font-semibold mt-4">Mission projection</h3>

          {result ? (
            <motion.div
              key={`${from}-${to}-${result.speed}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-7 flex-1"
            >
              <div className="flex items-center justify-between gap-3 text-sm">
                <span>{from}</span>
                <Rocket size={20} className="text-cyan-300" />
                <span>{to}</span>
              </div>

              <div className="relative my-6 h-[3px] bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-violet-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Metric label="Estimated distance" value={`${fmt(result.distance, 1)} km`} />
                <Metric label="Travel time" value={`${fmt(result.hours / 24, 2)} days`} />
                <Metric label="Earth years" value={fmt(result.hours / (24 * 365.25), 3)} />
                <Metric label="Travel speed" value={`${fmt(result.speed)} km/h`} />
              </div>

              <p className="mt-7 text-sm text-slate-400 leading-7">
                This speed is approximately{" "}
                <strong className="text-cyan-300">
                  {fmt(result.speed / 1079252848.8 * 100, 5)}%
                </strong>{" "}
                of the speed of light.
              </p>
            </motion.div>
          ) : (
            <div className="flex-1 min-h-[300px] flex flex-col items-center justify-center text-center">
              <div className="h-24 w-24 rounded-full border border-dashed border-cyan-400/30 flex items-center justify-center bg-cyan-400/5">
                <Compass size={38} className="text-cyan-300" />
              </div>
              <p className="mt-6 text-slate-200">Awaiting flight parameters</p>
              <p className="mt-2 text-sm text-slate-500">
                Configure your destination to generate an estimate.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Missions() {
  const [filter, setFilter] = useState("All");

  const visible = missions.filter((m) => {
    if (filter === "Completed") return m.status === "Completed";
    if (filter === "Active") return m.status === "Active";
    if (filter === "Upcoming") return m.status === "Program";
    return true;
  });

  return (
    <section id="missions" className="section-wrap">
      <SectionTitle
        eyebrow="04 / MISSION CONTROL"
        title="Humanity's greatest journeys."
        description="From humanity's first Moon landing to robotic spacecraft exploring the outer solar system, investigate milestones that changed our understanding of space."
      />

      <div className="flex flex-wrap gap-2 mb-7">
        {["All", "Completed", "Active", "Upcoming"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`chip ${filter === f ? "chip-active" : ""}`}
          >
            {f === "Upcoming" ? "Programs / Future" : f}
          </button>
        ))}
      </div>

      {filter === "Upcoming" && (
        <p className="text-sm text-slate-400 mb-5">
          The Artemis program has future mission phases, but this dashboard does not
          claim a specific upcoming launch date or live mission status.
        </p>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {visible.map((m) => (
          <div key={m.name} className="glass-panel p-6 hover:border-cyan-400/25 transition-colors">
            <div className="flex justify-between items-start gap-4">
              <span className="w-11 h-11 rounded-xl bg-cyan-400/10 text-cyan-300 flex items-center justify-center">
                <Satellite size={22} />
              </span>
              <span
                className={`text-[10px] px-3 py-1.5 rounded-full border ${
                  m.status === "Active"
                    ? "text-emerald-300 border-emerald-400/20 bg-emerald-400/5"
                    : m.status === "Completed"
                    ? "text-slate-300 border-white/10"
                    : "text-violet-300 border-violet-400/20"
                }`}
              >
                {m.status === "Program" ? "MULTI-MISSION PROGRAM" : m.status.toUpperCase()}
              </span>
            </div>
            <h3 className="text-xl font-semibold mt-7">{m.name}</h3>
            <p className="text-cyan-300 text-xs font-mono mt-2">
              {m.launch}
            </p>
            <p className="text-slate-300 text-sm leading-6 mt-5">
              {m.objective}
            </p>
            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="text-[10px] tracking-widest text-slate-500 mb-2">
                KEY MILESTONE
              </p>
              <p className="text-sm text-slate-400 leading-6">{m.milestone}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6 md:p-8 mt-8">
        <Tag>MISSION CHRONOLOGY</Tag>
        <h3 className="text-2xl font-semibold mt-4 mb-8">Historical timeline</h3>
        <div className="relative border-l border-cyan-400/20 ml-2 pl-7 space-y-7">
          {missions
            .slice()
            .sort((a, b) => a.year - b.year)
            .map((m) => (
              <div key={m.name} className="relative">
                <span className="absolute -left-[34px] top-1 h-3 w-3 rounded-full bg-cyan-400 border-4 border-[#0b1120]" />
                <p className="text-xs font-mono text-cyan-300">{m.year}</p>
                <p className="font-semibold mt-1">{m.name}</p>
                <p className="text-xs text-slate-400 mt-2">{m.milestone}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

function Quiz() {
  const [difficulty, setDifficulty] = useState("All");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [best, setBest] = useState<Record<string, number>>({});

  const quizQuestions = useMemo(
    () => questions.filter(
      (q) => difficulty === "All" || q.difficulty === difficulty
    ),
    [difficulty]
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cosmic-quiz-records");
      if (saved) setBest(JSON.parse(saved));
    } catch {
      // Private browsing or unavailable storage.
    }
  }, []);

  const choose = (option: number) => {
    if (selected !== null || finished) return;
    setSelected(option);
    if (option === quizQuestions[index].answer) {
      setScore((previous) => previous + 1);
    }
  };

  const next = () => {
    if (index + 1 < quizQuestions.length) {
      setIndex((i) => i + 1);
      setSelected(null);
    } else {
      const recordKey = difficulty;
      const newBest = Math.max(best[recordKey] || 0, score);
      const records = { ...best, [recordKey]: newBest };
      setBest(records);
      try {
        localStorage.setItem("cosmic-quiz-records", JSON.stringify(records));
      } catch {
        // The quiz remains functional without persistence.
      }
      setFinished(true);
    }
  };

  const restart = (newDifficulty = difficulty) => {
    setDifficulty(newDifficulty);
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  const question = quizQuestions[index];

  return (
    <section id="quiz" className="section-wrap">
      <SectionTitle
        eyebrow="05 / COSMIC KNOWLEDGE TEST"
        title="Test your cosmic intelligence."
        description="Ten astronomy questions across three levels of difficulty. Learn something new with explanations after each answer."
      />

      <div className="glass-panel p-6 md:p-10 max-w-3xl mx-auto">
        <div className="flex justify-between flex-wrap gap-4 items-center">
          <Tag>DISCOVERY QUIZ</Tag>
          <span className="text-xs text-slate-400 font-mono">
            PERSONAL BEST: {best[difficulty] || 0}/{quizQuestions.length}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mt-6 mb-8">
          {["All", "Easy", "Medium", "Hard"].map((d) => (
            <button
              key={d}
              onClick={() => restart(d)}
              className={`chip ${difficulty === d ? "chip-active" : ""}`}
            >
              {d === "All" ? "All Levels · 10" : d}
            </button>
          ))}
        </div>

        {finished ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <Sparkles size={50} className="mx-auto text-cyan-300 mb-5" />
            <h3 className="text-3xl font-semibold">Mission complete!</h3>
            <p className="text-6xl font-bold text-cyan-300 my-7">
              {score}/{quizQuestions.length}
            </p>
            <p className="text-slate-400">
              You answered {Math.round(score / quizQuestions.length * 100)}%
              of the questions correctly.
            </p>
            <button className="primary-btn mt-8 mx-auto" onClick={() => restart()}>
              <RefreshCcw size={17} /> RESTART QUIZ
            </button>
          </motion.div>
        ) : (
          <>
            <div className="flex justify-between text-xs text-slate-400 mb-3">
              <span>QUESTION {index + 1} OF {quizQuestions.length}</span>
              <span>{question.difficulty.toUpperCase()}</span>
            </div>

            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-9">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-violet-500"
                animate={{ width: `${(index + 1) / quizQuestions.length * 100}%` }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${difficulty}-${index}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-7">
                  {question.question}
                </h3>
                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => {
                    const correct = question.answer === optionIndex;
                    const answered = selected !== null;

                    return (
                      <button
                        key={option}
                        onClick={() => choose(optionIndex)}
                        disabled={answered}
                        className={`w-full text-left p-4 rounded-xl border transition-colors flex items-center gap-4 ${
                          answered && correct
                            ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-200"
                            : answered && selected === optionIndex
                            ? "border-rose-400/60 bg-rose-400/10 text-rose-200"
                            : "border-white/10 bg-white/[0.03] hover:border-cyan-400/40 text-slate-200"
                        }`}
                      >
                        <span className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 font-mono text-xs shrink-0">
                          {String.fromCharCode(65 + optionIndex)}
                        </span>
                        <span className="text-sm">{option}</span>
                        {answered && correct && (
                          <CheckCircle2 size={17} className="ml-auto shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {selected !== null && (
              <div className="mt-7">
                <div role="status" className="p-4 rounded-xl border border-cyan-400/20 bg-cyan-400/5">
                  <p className="text-cyan-300 font-semibold text-sm">
                    {selected === question.answer ? "Correct answer!" : "Not quite!"}
                  </p>
                  <p className="text-slate-300 text-sm leading-6 mt-2">
                    {question.explanation}
                  </p>
                </div>
                <button className="primary-btn mt-5" onClick={next}>
                  {index + 1 === quizQuestions.length ? "VIEW FINAL SCORE" : "NEXT QUESTION"}
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function SpacecraftDashboard() {
  const [state, setState] = useState<"idle" | "running" | "paused">("idle");
  const [destination, setDestination] = useState("Mars");
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (state !== "running") return;

    const interval = window.setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [state]);

  const velocity = state === "idle" ? 0 : 28500;
  const fuel = Math.max(0, 100 - elapsed * 0.012);
  const distance = elapsed * (velocity / 3600);

  useEffect(() => {
    if (fuel <= 0 && state === "running") setState("paused");
  }, [fuel, state]);

  const reset = () => {
    setState("idle");
    setElapsed(0);
  };

  const time = [
    Math.floor(elapsed / 3600),
    Math.floor((elapsed % 3600) / 60),
    elapsed % 60,
  ]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");

  return (
    <section id="spacecraft" className="section-wrap">
      <SectionTitle
        eyebrow="06 / FLIGHT SIMULATOR"
        title="Take command."
        description="Welcome aboard EXPLORER-01. Start, pause and reset a fictional spacecraft's telemetry, and choose your next target."
      />

      <div className="glass-panel p-6 md:p-9">
        <div className="flex flex-wrap justify-between gap-5 items-start">
          <div>
            <Tag live>SPACECRAFT OPERATIONS / SIMULATION</Tag>
            <h3 className="text-3xl font-semibold mt-4">EXPLORER-01</h3>
            <p className="text-slate-500 text-xs font-mono mt-2">
              SIMULATED TELEMETRY · NOT A REAL SPACECRAFT
            </p>
          </div>
          <span className={`px-4 py-2 rounded-full text-xs tracking-widest border ${
            state === "running"
              ? "text-emerald-300 border-emerald-400/30"
              : "text-slate-300 border-white/20"
          }`}>
            {state.toUpperCase()}
          </span>
        </div>

        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-8 mt-9">
          <div className="relative min-h-[250px] rounded-2xl bg-[#050b18] border border-white/10 flex items-center justify-center overflow-hidden">
            <div className="absolute w-64 h-64 border border-dashed border-cyan-400/20 rounded-full" />
            <div className="absolute w-44 h-44 border border-white/10 rounded-full" />
            <div className="absolute w-28 h-28 rounded-full bg-cyan-400/5 blur-2xl" />
            <motion.div
              animate={state === "running" ? { x: [0, 28, 0], y: [0, -18, 0] } : { x: 0, y: 0 }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <Rocket size={76} strokeWidth={1.1} className="text-cyan-300 rotate-45 drop-shadow-[0_0_20px_#22d3ee]" />
            </motion.div>
            <div className="absolute bottom-5 left-5 right-5 flex justify-between text-[10px] font-mono text-slate-500">
              <span>ORIGIN: EARTH</span>
              <span>TARGET: {destination.toUpperCase()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 content-center">
            <Metric label="Velocity" value={`${fmt(velocity)} km/h`} />
            <Metric label="Distance travelled" value={`${fmt(distance, 2)} km`} />
            <Metric label="Mission timer" value={time} />
            <Metric label="Destination" value={destination} />

            <div className="col-span-2 p-5 rounded-xl border border-white/10 bg-white/[0.025]">
              <div className="flex justify-between text-xs text-slate-400 mb-4">
                <span>SIMULATED FUEL</span>
                <span className="text-cyan-300">{fuel.toFixed(2)}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-1000"
                  style={{ width: `${fuel}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_auto] gap-4 items-end mt-7">
          <label className="field-label">
            SELECT DESTINATION
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="space-input"
            >
              {["Mars", "Jupiter", "Saturn", "Neptune", "Proxima Centauri"].map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </label>

          <div className="flex flex-wrap gap-2">
            <button
              className="primary-btn"
              disabled={state === "running" || fuel <= 0}
              onClick={() => setState("running")}
            >
              <Play size={16} /> START
            </button>
            <button
              className="secondary-btn"
              disabled={state !== "running"}
              onClick={() => setState("paused")}
            >
              <Pause size={16} /> PAUSE
            </button>
            <button className="secondary-btn" onClick={reset}>
              <RefreshCcw size={16} /> RESET
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-6 mt-7">
          Simulation assumptions: constant velocity of 28,500 km/h, fuel usage
          of 0.012 percentage points per simulated second and elapsed wall-clock
          time as mission time. Distance is calculated from velocity and elapsed
          time. Destination selection does not affect trajectory.
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-wrap pb-28">
      <div className="glass-panel p-7 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl">
          <Tag>ABOUT THE OBSERVATORY</Tag>
          <h2 className="text-4xl md:text-5xl font-semibold mt-5 tracking-tight">
            Curiosity has no boundaries.
          </h2>
          <p className="text-slate-300 leading-8 mt-7">
            Cosmic Explorer is an independent educational space experience
            designed to make astronomy interactive, accessible and exciting.
            Browse planets, study cosmic objects, compare astronomical
            measurements and simulate journeys through space.
          </p>
          <p className="text-slate-400 leading-7 mt-4 text-sm">
            This project is not affiliated with NASA. It uses approximate,
            static educational data and stylized 3D models. Information
            and mission statuses should be checked against primary sources
            before professional or scientific use.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="https://science.nasa.gov/solar-system/"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-btn"
            >
              NASA SOLAR SYSTEM <ArrowUpRight size={16} />
            </a>
            <a
              href="https://science.nasa.gov/missions/"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-btn"
            >
              NASA MISSIONS <ArrowUpRight size={16} />
            </a>
            <button className="primary-btn" onClick={() => navigate("home")}>
              BACK TO TOP <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030712] text-[#f8fafc] selection:bg-cyan-400/25">
      <Starfield />
      <Navbar />

      <div className="relative z-10">
        <Hero />
        <SolarSystem />
        <Universe />
        <Calculator />
        <Missions />
        <Quiz />
        <SpacecraftDashboard />
        <About />

        <footer className="border-t border-white/10 px-5 md:px-8 py-9">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-5 items-center">
            <div className="flex items-center gap-2 text-cyan-300 text-sm font-semibold tracking-widest">
              <Orbit size={20} /> COSMIC EXPLORER
            </div>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Cosmic Explorer. Built for discovery.
            </p>
            <button
              onClick={() => navigate("home")}
              className="text-xs text-slate-400 hover:text-cyan-300"
            >
              RETURN TO LAUNCH
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
