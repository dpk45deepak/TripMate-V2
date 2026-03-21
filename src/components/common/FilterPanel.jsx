import React, { useEffect, useState, useMemo, useCallback, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter, Save, CheckCircle2, RotateCcw } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Backend API and logic
import BACKEND_API from "../../Services/Backend";
import AuthContext from "../../Context/AuthContext";

// CONSTANTS
const DEST_TYPES = ["Beaches", "Mountains", "Cities", "Nature's Beauty", "Adventure", "Islands", "Historical", "Wildlife"];
const CLIMATES = ["Tropical", "Cold", "Temperate", "Arid", "Mediterranean", "Monsoon"];
const ACTIVITIES = ["Adventure", "Relaxation", "Sightseeing", "Cultural", "Wildlife", "Hiking", "Water Sports"];
const DURATIONS = ["Weekend", "3-5 days", "1 week", "2 weeks", "1 month"];
const BUDGET_OPTIONS = [
  { value: "Under 50K", label: "Budget Friendly", range: { min: 0, max: 50000 } },
  { value: "50K - 100K", label: "Comfort", range: { min: 50000, max: 100000 } },
  { value: "100K - 250K", label: "Premium", range: { min: 100000, max: 250000 } },
  { value: "250K - 500K", label: "Luxury", range: { min: 250000, max: 500000 } },
  { value: "Above 500K", label: "Ultra Luxury", range: { min: 500000, max: 1000000 } }
];

export default function FilterPanel({ isOpenProp, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState({
    destinationTypes: [],
    climates: [],
    activities: [],
    duration: "",
    budget: BUDGET_OPTIONS[1].value,
  });

  // navigate for redirection after saving preferences
  const navigate = useNavigate();

  // Global Context
  const { user, updateUser } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const userBudget = user.budget || 50000;
      const matchingBudget = BUDGET_OPTIONS.find(
        opt => userBudget >= opt.range.min && userBudget <= opt.range.max
      ) || BUDGET_OPTIONS[1];

      setFilters({
        destinationTypes: user.destinationType || [],
        climates: user.climatePreference || [],
        activities: user.activities || [],
        duration: user.duration || "",
        budget: matchingBudget.value,
      });
    }
  }, [user]);

  useEffect(() => {
    document.body.style.overflow = isOpenProp ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpenProp]);

  const toggleFilter = (key, value) => {
    setFilters((prev) => {
      const arr = Array.isArray(prev[key]) ? prev[key] : [];
      if (['destinationTypes', 'climates', 'activities'].includes(key)) {
        const updated = arr.includes(value)
          ? arr.filter((v) => v.toLowerCase() !== value.toLowerCase())
          : [...arr, value];
        return { ...prev, [key]: updated };
      }
      return { ...prev, [key]: prev[key] === value ? "" : value };
    });
  };

  const handleDurationSelect = (value) => {
    setFilters((prev) => ({ ...prev, duration: prev.duration === value ? "" : value }));
  };

  const handleBudgetSelect = (budgetValue) => {
    setFilters(prev => ({ ...prev, budget: budgetValue }));
  };

  const clearAll = () => {
    setFilters({
      destinationTypes: [],
      climates: [],
      activities: [],
      duration: "",
      budget: BUDGET_OPTIONS[1].value,
    });
  };

  const handleSave = async (e) => {
    e?.preventDefault?.();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (!user?._id && !user?.id) throw new Error('User not authenticated');
      if (!Array.isArray(filters?.destinationTypes) || filters.destinationTypes.length === 0) {
        throw new Error('Please select at least one destination type');
      }
      const selectedBudget = BUDGET_OPTIONS.find(opt => opt.value === filters.budget) || BUDGET_OPTIONS[1];
      const payload = {
        userId: user._id || user.id,
        favouriteDestinationTypes: filters.destinationTypes,
        favouriteActivities: filters.activities,
        favouriteClimates: filters.climates,
        favouriteDurations: filters.duration,
        favouriteBudget: selectedBudget.range?.max || 0,
      };
      const res = await BACKEND_API.Users.SetFavouriteCategories(payload);
      if (res?.data?.status === 200 || res?.data?.success) {
        updateUser({ ...user, ...payload });
        toast.success("Preferences saved!");
        if (onClose) onClose();
      } else {
        throw new Error(res?.data?.message || 'Failed to save');
      }
    } catch (err) {
      toast.error(err.message || 'Error saving preferences');
    } finally {
      navigate("/home")
      setIsSubmitting(false);
    }
  };

  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const panelVariants = {
    hidden: { x: "100%", opacity: 0.5 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 200 } }
  };

  return (
    <AnimatePresence>
      {isOpenProp && (
        <motion.div className="fixed inset-0 z-50 flex justify-end" initial="hidden" animate="visible" exit="hidden" variants={backdropVariants}>
          <motion.div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

          <motion.aside className="relative w-full max-w-2xl bg-slate-50 shadow-2xl h-screen flex flex-col" variants={panelVariants}>
            {/* Header with Teal-to-Indigo Gradient Icon Container */}
            <header className="px-6 py-3 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-linear-to-br from-teal-400 to-indigo-600 rounded-xl shadow-lg shadow-teal-100">
                  <Filter className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Travel Preferences</h3>
                  <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider">Tailor your experience</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </header>

            <main className="flex-1 overflow-y-auto p-6 space-y-10">
              <section>
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-slate-800">Discovery Filters</h4>
                  <p className="text-sm text-slate-500">Select multiple options to refine your perfect trip.</p>
                </div>

                <div className="space-y-8">
                  <FilterSection title="Destination Styles" items={DEST_TYPES} selected={filters.destinationTypes} toggle={(item) => toggleFilter('destinationTypes', item)} activeClass="bg-linear-to-r from-teal-500 to-teal-600 text-white shadow-teal-100" idleClass="hover:border-teal-300 hover:bg-teal-50" />
                  <FilterSection title="Weather & Climate" items={CLIMATES} selected={filters.climates} toggle={(item) => toggleFilter('climates', item)} activeClass="bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-blue-100" idleClass="hover:border-blue-300 hover:bg-blue-50" />
                  <FilterSection title="Activities" items={ACTIVITIES} selected={filters.activities} toggle={(item) => toggleFilter('activities', item)} activeClass="bg-linear-to-r from-purple-500 to-indigo-600 text-white shadow-purple-100" idleClass="hover:border-purple-300 hover:bg-purple-50" />
                  <FilterSection title="Trip Duration" items={DURATIONS} selected={filters.duration} toggle={(item) => handleDurationSelect(item)} activeClass="bg-linear-to-r from-amber-400 to-orange-500 text-white shadow-amber-100" idleClass="hover:border-amber-300 hover:bg-amber-50" />
                </div>
              </section>

              <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-base font-bold text-slate-800 mb-4">Budget Planning</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {BUDGET_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleBudgetSelect(option.value)}
                      className={`group p-4 rounded-xl text-left transition-all duration-300 border-2 ${filters.budget === option.value
                          ? 'border-teal-500 bg-teal-50/50 shadow-md'
                          : 'border-slate-100 bg-slate-50 hover:border-teal-200'
                        }`}
                    >
                      <div className={`text-sm font-bold ${filters.budget === option.value ? 'text-teal-700' : 'text-slate-700'}`}>{option.label}</div>
                      <div className="text-xs text-slate-500 mt-1 font-mono">{option.value}</div>
                    </button>
                  ))}
                </div>
              </section>
            </main>

            {/* Footer with Gradient Save Button */}
            <footer className="p-2 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span className="text-sm font-semibold text-slate-600">
                  {filters.destinationTypes.length + filters.climates.length + filters.activities.length + (filters.duration ? 1 : 0)} filters active
                </span>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={clearAll}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 active:scale-95 transition-all"
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className={`flex-1 sm:flex-none min-w-45 flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-white shadow-lg active:scale-95 transition-all ${isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-linear-to-r from-teal-600 to-blue-400 hover:from-teal-600 hover:to-indigo-700 shadow-teal-200"
                    }`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><Save className="w-4 h-4" /> {user ? 'Save Preferences' : 'Sign In to Save'}</>
                  )}
                </button>
              </div>
            </footer>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const FilterSection = ({ title, items, selected, toggle, activeClass, idleClass }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isSelected = Array.isArray(selected) ? selected.includes(item) : selected === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => toggle(item)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-200 flex items-center gap-2 ${isSelected
                  ? `${activeClass} border-transparent scale-105 shadow-md`
                  : `bg-white border-slate-100 text-slate-600 ${idleClass}`
                }`}
            >
              {item}
              {isSelected && <CheckCircle2 className="w-4 h-4" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};