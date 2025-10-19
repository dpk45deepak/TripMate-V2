// FilterPanel.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter } from "lucide-react";

/**
 * Props:
 * - isOpen (bool) : open/close the drawer
 * - onClose (fn)   : called when user wants to close
 * - onApply (fn)   : (filters) => {} called when Apply/Show Trips clicked
 *
 * Example:
 * <FilterPanel isOpen={open} onClose={() => setOpen(false)} onApply={(f)=>console.log(f)} />
 */

const DEST_TYPES = [
  "Beaches",
  "Mountains",
  "Cities",
  "Forests",
  "Deserts",
  "Islands",
  "Lakes",
  "Rivers",
];

const CLIMATES = ["Tropical", "Cold", "Temperate", "Arid", "Mediterranean", "Monsoon"];

const ACTIVITIES = [
  "Adventure",
  "Relaxation",
  "Sightseeing",
  "Cultural",
  "Wildlife",
  "Hiking",
  "Water Sports",
];

const DURATIONS = ["Weekend", "3-5 days", "1 week", "2 weeks", "1 month"];

/* Simple debounce helper (used for slider updates to avoid too many re-renders) */
function debounce(fn, wait = 100) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

export default function FilterPanel({ isOpen, onClose, onApply }) {
  const backdropRef = useRef(null);

  // local filter state
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedClimates, setSelectedClimates] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [duration, setDuration] = useState(""); // single select
  const [budget, setBudget] = useState({ min: 100, max: 2000 }); // currency units
  const [minInput, setMinInput] = useState(budget.min);
  const [maxInput, setMaxInput] = useState(budget.max);

  // reset inputs when opened (optional behaviour)
  useEffect(() => {
    if (isOpen) {
      // keep previous selections or uncomment to reset
      // setSelectedTypes([]); setSelectedClimates([]); setSelectedActivities([]); setDuration(""); 
      setMinInput(budget.min); setMaxInput(budget.max);
    }
  }, [isOpen]);

  // close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // click outside to close
  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose?.();
  };

  // toggle helpers
  const toggleIn = (setter, arr, value) => {
    setter((prev) => (prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]));
  };

  // Slider handlers: ensure min <= max - gap
  const GAP = 50; // min gap between min and max
  const handleMinChange = (val) => {
    const newMin = Math.min(Number(val), maxInput - GAP);
    setMinInput(newMin);
    setBudget((prev) => ({ ...prev, min: newMin }));
  };
  const handleMaxChange = (val) => {
    const newMax = Math.max(Number(val), minInput + GAP);
    setMaxInput(newMax);
    setBudget((prev) => ({ ...prev, max: newMax }));
  };

  // Debounced inputs in case user types numeric inputs
  const debouncedMin = debounce((v) => handleMinChange(v), 120);
  const debouncedMax = debounce((v) => handleMaxChange(v), 120);

  // Apply filters
  const applyFilters = () => {
    const payload = {
      types: selectedTypes,
      climates: selectedClimates,
      activities: selectedActivities,
      duration,
      budget,
    };
    onApply?.(payload);
    onClose?.();
  };

  // Clear filters
  const clearAll = () => {
    setSelectedTypes([]);
    setSelectedClimates([]);
    setSelectedActivities([]);
    setDuration("");
    setBudget({ min: 100, max: 2000 });
    setMinInput(100);
    setMaxInput(2000);
  };

  // Framer variants
  const backdrop = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const panel = { hidden: { x: "100%" }, visible: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } } };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdrop}
          ref={backdropRef}
          onMouseDown={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div className="absolute inset-0 bg-black/40" variants={backdrop} />

          {/* Panel / Drawer */}
          <motion.aside
            className="relative ml-auto w-full max-w-2xl bg-white rounded-l-2xl shadow-2xl h-full overflow-y-auto p-6 sm:p-8"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="hidden"
            role="dialog"
            aria-modal="true"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Filter className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Filter Trips</h3>
                  <p className="text-xs text-slate-400">Refine results to see personalized trip suggestions</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearAll}
                  className="text-sm text-slate-500 hover:text-slate-700 px-3 py-2 rounded-md transition"
                >
                  Clear
                </button>
                <button
                  onClick={onClose}
                  aria-label="Close filters"
                  className="p-2 rounded-md bg-slate-100 hover:bg-slate-200"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              {/* Destination Type */}
              <section>
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Destination type</h4>
                <div className="flex flex-wrap gap-3">
                  {DEST_TYPES.map((t) => {
                    const active = selectedTypes.includes(t);
                    return (
                      <button
                        key={t}
                        onClick={() => toggleIn(setSelectedTypes, selectedTypes, t)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-all focus:outline-none ${
                          active
                            ? "bg-emerald-600 text-white shadow-md"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Climate Preference */}
              <section>
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Climate preference</h4>
                <div className="flex flex-wrap gap-3">
                  {CLIMATES.map((c) => {
                    const active = selectedClimates.includes(c);
                    return (
                      <button
                        key={c}
                        onClick={() => toggleIn(setSelectedClimates, selectedClimates, c)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-all focus:outline-none ${
                          active
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Activities */}
              <section>
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Activities</h4>
                <div className="flex flex-wrap gap-3">
                  {ACTIVITIES.map((a) => {
                    const active = selectedActivities.includes(a);
                    return (
                      <button
                        key={a}
                        onClick={() => toggleIn(setSelectedActivities, selectedActivities, a)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-all focus:outline-none ${
                          active
                            ? "bg-purple-600 text-white shadow-md"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {a}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Duration (single-select) */}
              <section>
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Duration</h4>
                <div className="flex flex-wrap gap-3">
                  {DURATIONS.map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setDuration((prev) => (prev === d ? "" : d))}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-all focus:outline-none ${
                        duration === d ? "bg-sky-600 text-white shadow-md" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </section>

              {/* Budget Slider */}
              <section>
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Budget (per person)</h4>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <div>Min: ₹{minInput}</div>
                  <div>Max: ₹{maxInput}</div>
                </div>

                {/* Visual track with two inputs */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center pointer-events-none px-2">
                    <div className="h-1 rounded-full bg-slate-200 w-full" />
                    <div
                      className="absolute h-1 rounded-full bg-emerald-500"
                      style={{
                        left: `${((minInput - 0) / 3000) * 100}%`,
                        right: `${100 - (maxInput / 3000) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Range inputs: min */}
                  <input
                    type="range"
                    min={0}
                    max={3000}
                    value={minInput}
                    onChange={(e) => handleMinChange(e.target.value)}
                    className="relative w-full appearance-none h-2 bg-transparent"
                    aria-label="Minimum budget"
                  />

                  {/* Range inputs: max (on top) */}
                  <input
                    type="range"
                    min={0}
                    max={3000}
                    value={maxInput}
                    onChange={(e) => handleMaxChange(e.target.value)}
                    className="relative w-full appearance-none h-2 bg-transparent -mt-1"
                    aria-label="Maximum budget"
                  />
                </div>

                {/* Numeric inputs (optional) */}
                <div className="flex gap-3 mt-3">
                  <input
                    type="number"
                    value={minInput}
                    onChange={(e) => debouncedMin(e.target.value)}
                    className="w-1/2 border border-slate-200 rounded-xl p-2 text-sm"
                    min={0}
                  />
                  <input
                    type="number"
                    value={maxInput}
                    onChange={(e) => debouncedMax(e.target.value)}
                    className="w-1/2 border border-slate-200 rounded-xl p-2 text-sm"
                    min={0}
                  />
                </div>
              </section>
            </div>

            {/* Footer - Apply */}
            <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="text-sm text-slate-500">Showing filters: <span className="font-medium text-slate-700">{selectedTypes.length + selectedClimates.length + selectedActivities.length + (duration ? 1 : 0)}</span></div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={clearAll}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl border text-sm text-slate-700 hover:bg-slate-50 transition"
                >
                  Reset
                </button>
                <button
                  onClick={applyFilters}
                  className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition"
                >
                  Show Trips
                </button>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
