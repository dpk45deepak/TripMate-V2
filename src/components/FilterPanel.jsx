import React, { useEffect, useState, useMemo, useCallback, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter, Save } from "lucide-react";
import { toast } from "react-toastify";

// Backend API and logic
import BACKEND_API from "../Services/Backend";
import AuthContext from "../Context/AuthContext";

// CONSTANTS
const DEST_TYPES = ["Beaches","Mountains","Cities","Forests","Deserts","Islands","Lakes","Rivers"];
const CLIMATES = ["Tropical","Cold","Temperate","Arid","Mediterranean","Monsoon"];
const ACTIVITIES = ["Adventure","Relaxation","Sightseeing","Cultural","Wildlife","Hiking","Water Sports"];
const DURATIONS = ["Weekend","3-5 days","1 week","2 weeks","1 month"];
const MAX_BUDGET = 100000;
const GAP = 100;

// UTILITIES
const debounce = (fn, delay = 150) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// MAIN COMPONENT
export default function FilterPanel({
  isOpenProp,
  onClose // NEW: Added onClose prop for proper closing
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [filters, setFilters] = useState({
    destinationTypes: [],
    climates: [],
    activities: [],
    duration: "",
    budget: { min: 100, max: 20000 },
  });

  const [minInput, setMinInput] = useState(100);
  const [maxInput, setMaxInput] = useState(20000);

  const { user, updateUser } = useContext(AuthContext);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize filters with user's preferences
  useEffect(() => {
    if (user) {
      const userBudget = user.budget || 20000;
      setFilters({
        destinationTypes: user.destinationType || [],
        climates: user.climatePreference || [],
        activities: user.activities || [],
        duration: user.duration || "",
        budget: { 
          min: 100, 
          max: Math.min(userBudget, MAX_BUDGET) 
        },
      });
      setMinInput(100);
      setMaxInput(Math.min(userBudget, MAX_BUDGET));
    }
  }, [user]);

  // Save user preferences
  const savePreferences = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const updatedPreferences = {
        userId: user._id,
        destinationType: filters.destinationTypes,
        climatePreference: filters.climates,
        activities: filters.activities,
        duration: filters.duration,
        budget: filters.budget.max
      };

      await BACKEND_API.Users.SetFavouriteCategories(updatedPreferences);

      // Update user context with new preferences
      updateUser({
        ...user,
        ...updatedPreferences
      });

      toast.success("Preferences saved successfully!");
      if (onClose) onClose(); // Use onClose instead of internal state
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error("Failed to save preferences. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpenProp ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
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
    setFilters((prev) => ({
      ...prev,
      duration: prev.duration === value ? "" : value,
    }));
  };

  const handleMinChange = useCallback(
    (val) => {
      const num = Number(val);
      if (isNaN(num)) return;
      const newMin = Math.min(Math.max(0, num), maxInput - GAP);
      setMinInput(newMin);
      setFilters((prev) => ({ ...prev, budget: { ...prev.budget, min: newMin } }));
    },
    [maxInput]
  );

  const handleMaxChange = useCallback(
    (val) => {
      const num = Number(val);
      if (isNaN(num)) return;
      const newMax = Math.min(Math.max(minInput + GAP, num), MAX_BUDGET);
      setMaxInput(newMax);
      setFilters((prev) => ({ ...prev, budget: { ...prev.budget, max: newMax } }));
    },
    [minInput]
  );

  const debouncedMin = useMemo(() => debounce(handleMinChange, 200), [handleMinChange]);
  const debouncedMax = useMemo(() => debounce(handleMaxChange, 200), [handleMaxChange]);

  const clearAll = () => {
    setFilters({
      destinationTypes: [],
      climates: [],
      activities: [],
      duration: "",
      budget: { min: 100, max: 20000 },
    });
    setMinInput(100);
    setMaxInput(20000);
  };

  const handleSave = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    try {
      if (!filters?.destinationTypes?.length) {
        throw new Error('Please select at least one destination type');
      }

      const payload = {
        userId: user?._id || user?.id,
        favouriteDestinationTypes: filters.destinationTypes,
        favouriteActivities: filters.activities,
        favouriteClimates: filters.climates,
        favouriteDurations: filters.duration,
        favouriteBudget: filters.budget.max,
      };

      console.log("Sending payload to backend:", payload);

      const res = await BACKEND_API.Users.SetFavouriteCategories(payload);

      if (!res?.data?.success) {
        throw new Error(res?.data?.message || "Failed to save preferences");
      }

      toast.success("Preferences saved successfully!");
      if (onClose) onClose();

    } catch (err) {
      console.error('Error saving preferences:', err);
      toast.error(err.message || "Failed to save preferences");
    } finally {
      setIsSubmitting(false);
    }
  };

  const backdrop = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const panel = { hidden: { x: "100%" }, visible: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } } };

  const renderFilterSections = () => (
    <>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Your Travel Preferences</h3>
        <p className="text-sm text-slate-600 mb-4">
          {user ? "Select multiple options for each category to refine your search" : "Sign in to save your preferences"}
        </p>
      </div>
      
      <FilterSection
        title="Destination Types"
        items={DEST_TYPES}
        selected={filters.destinationTypes}
        toggle={(item) => toggleFilter('destinationTypes', item)}
        color="emerald"
        multiSelect
      />
      <FilterSection
        title="Climate Preferences"
        items={CLIMATES}
        selected={filters.climates}
        toggle={(item) => toggleFilter('climates', item)}
        color="blue"
        multiSelect
      />
      <FilterSection
        title="Activities"
        items={ACTIVITIES}
        selected={filters.activities}
        toggle={(item) => toggleFilter('activities', item)}
        color="purple"
        multiSelect
      />
      <FilterSection
        title="Trip Duration"
        items={DURATIONS}
        selected={filters.duration}
        toggle={(item) => handleDurationSelect(item)}
        color="sky"
      />
    </>
  );

  return (
    <AnimatePresence>
      {isOpenProp && (
        <motion.div className="fixed inset-0 z-50 flex h-screen" initial="hidden" animate="visible" exit="hidden" variants={backdrop}>
          <motion.div className="absolute inset-0 bg-black/40" onClick={onClose} variants={backdrop} />
          <motion.aside className="relative ml-auto w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:max-w-2xl bg-white rounded-t-2xl sm:rounded-l-2xl shadow-2xl h-full overflow-y-auto p-6" variants={panel}>
            <header className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Filter className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Set Your Travel Preferences</h3>
                  <p className="text-sm text-slate-400">Save your preferences for personalized recommendations</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-md bg-slate-100 hover:bg-slate-200" aria-label="Close filters">
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </header>

            <main className="mt-6 space-y-6">
              {renderFilterSections()}
              <BudgetSection minInput={minInput} maxInput={maxInput} onMinChange={handleMinChange} onMaxChange={handleMaxChange} debouncedMin={debouncedMin} debouncedMax={debouncedMax} />
            </main>

            <footer className="border-t mt-6 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="text-sm text-slate-500">
                Selected Filters:{" "}
                <span className="font-medium text-slate-700">
                  {filters.destinationTypes.length + filters.climates.length + filters.activities.length + (filters.duration ? 1 : 0)}
                </span>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button onClick={clearAll} className="border px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition">
                  Reset
                </button>
                <button onClick={handleSave} disabled={isSubmitting} className={`px-6 py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 shadow-lg transition-all ${isSubmitting ? "bg-emerald-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 hover:shadow-xl"}`}>
                  {isSaving ? (
                    <>
                      <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {user ? 'Saving...' : 'Please sign in'}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-1" />
                      {user ? 'Save Preferences' : 'Sign in to save'}
                    </>
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

// -------------------- SUB COMPONENTS --------------------
const FilterSection = ({ title, items, selected, toggle, color, multiSelect = false }) => {
  const getColorClasses = (isActive) => {
    if (!isActive)
      return "bg-white text-slate-700 border-slate-200 hover:bg-slate-50";

    switch (color) {
      case "emerald":
        return "bg-emerald-600 text-white border-transparent shadow-md focus:ring-emerald-500";
      case "blue":
        return "bg-blue-600 text-white border-transparent shadow-md focus:ring-blue-500";
      case "purple":
        return "bg-purple-600 text-white border-transparent shadow-md focus:ring-purple-500";
      case "sky":
        return "bg-blue-400 text-white border-transparent shadow-md focus:ring-blue-500";
      default:
        return "bg-gray-600 text-white border-transparent shadow-md focus:ring-gray-500";
    }
  };

  const isSelected = (item) => {
    if (Array.isArray(selected)) {
      return selected.some(selectedItem => 
        selectedItem.toLowerCase() === item.toLowerCase()
      );
    }
    return selected?.toLowerCase() === item.toLowerCase();
  };

  return (
    <section className="mb-6">
      <h4 className="text-base font-semibold text-slate-700 mb-3">{title}</h4>
      <div className="flex flex-wrap gap-3">
        {items.map((item) => {
          const selected = isSelected(item);
          return (
            <button
              key={item}
              onClick={() => toggle(item)}
              className={`px-4 py-2 rounded-full text-sm border transition-all focus:ring-2 focus:ring-offset-2 ${
                selected 
                  ? getColorClasses(true)
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              aria-pressed={selected}
            >
              {item}
            </button>
          );
        })}
      </div>
    </section>
  );
};

const BudgetSection = ({
  minInput,
  maxInput,
  onMinChange,
  onMaxChange,
  debouncedMin,
  debouncedMax,
}) => (
  <section>
    <h4 className="text-base font-semibold text-slate-700 mb-3">
      Budget (per person)
    </h4>

    <div className="flex justify-between text-sm text-slate-500 mb-2">
      <span>Min: ₹{minInput?.toLocaleString()}</span>
      <span>Max: ₹{maxInput?.toLocaleString()}</span>
    </div>

    <div className="relative">
      <div className="h-1 bg-slate-200 rounded-full relative">
        <div
          className="absolute h-1 bg-emerald-500 rounded-full"
          style={{
            left: `${(minInput / MAX_BUDGET) * 100}%`,
            right: `${100 - (maxInput / MAX_BUDGET) * 100}%`,
          }}
        />
      </div>

      <input
        type="range"
        min={0}
        max={MAX_BUDGET - GAP}
        value={minInput}
        onChange={(e) => onMinChange(e.target.value)}
        className="absolute w-full appearance-none h-3 bg-transparent cursor-pointer top-0"
      />
      <input
        type="range"
        min={GAP}
        max={MAX_BUDGET}
        value={maxInput}
        onChange={(e) => onMaxChange(e.target.value)}
        className="absolute w-full appearance-none h-3 bg-transparent top-0"
      />
    </div>

    <div className="flex gap-3 mt-4">
      <BudgetInput label="Min" value={minInput} onChange={debouncedMin} />
      <BudgetInput label="Max" value={maxInput} onChange={debouncedMax} />
    </div>
  </section>
);

const BudgetInput = ({ label, value, onChange }) => (
  <div className="w-1/2 relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
      step={100}
      aria-label={label}
    />
  </div>
);