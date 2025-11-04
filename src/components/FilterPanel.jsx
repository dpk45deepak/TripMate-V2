import React, { useEffect, useState, useMemo, useCallback, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter, Save } from "lucide-react";
import { toast } from "react-toastify";

// Backend API and logic
import BACKEND_API from "../Services/Backend";
import AuthContext from "../Context/AuthContext";

// CONSTANTS
const DEST_TYPES = ["Beaches","Mountains","Cities","Nature's Beauty","Adventure","Islands","Historical","Wildlife"];
const CLIMATES = ["Tropical","Cold","Temperate","Arid","Mediterranean","Monsoon"];
const ACTIVITIES = ["Adventure","Relaxation","Sightseeing","Cultural","Wildlife","Hiking","Water Sports"];
const DURATIONS = ["Weekend","3-5 days","1 week","2 weeks","1 month"];
const BUDGET_OPTIONS = [
  { value: "Under 50K", label: "Budget Friendly", range: { min: 0, max: 50000 } },
  { value: "50K - 100K", label: "Comfort", range: { min: 50000, max: 100000 } },
  { value: "100K - 250K", label: "Premium", range: { min: 100000, max: 250000 } },
  { value: "250K - 500K", label: "Luxury", range: { min: 250000, max: 500000 } },
  { value: "Above 500K", label: "Ultra Luxury", range: { min: 500000, max: 1000000 } }
];

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
    budget: BUDGET_OPTIONS[1].value, // Default to "50K - 100K"
  });

  const { user, updateUser } = useContext(AuthContext);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize filters with user's preferences
  useEffect(() => {
    if (user) {
      // Find the matching budget option based on user's budget
      const userBudget = user.budget || 50000; // Default to 50K if no budget set
      const matchingBudget = BUDGET_OPTIONS.find(
        opt => userBudget >= opt.range.min && userBudget <= opt.range.max
      ) || BUDGET_OPTIONS[1]; // Default to "50K - 100K" if no match found

      setFilters({
        destinationTypes: user.destinationType || [],
        climates: user.climatePreference || [],
        activities: user.activities || [],
        duration: user.duration || "",
        budget: matchingBudget.value,
      });
    }
  }, [user]);
 

  // Save user preferences
  const savePreferences = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      const selectedBudget = BUDGET_OPTIONS.find(opt => opt.value === filters.budget);
      
      const updatedPreferences = {
        userId: user?.id || user._id,
        destinationType: filters.destinationTypes,
        climatePreference: filters.climates,
        activities: filters.activities,
        duration: filters.duration,
        budget: selectedBudget ? selectedBudget.range.max : 100000 // Default to 100K if no match
      };

      const response = await BACKEND_API.Users.SetFavouriteCategories(updatedPreferences);

      if (response?.data?.success) {
        // Update user context with new preferences
        updateUser({
          ...user,
          ...updatedPreferences
        });

        toast.success("Preferences saved successfully!");
        if (onClose) onClose();
      } else {
        throw new Error(response?.data?.message || "Failed to save preferences");
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error(error.message || "Failed to save preferences. Please try again.");
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

  const handleBudgetSelect = (budgetValue) => {
    setFilters(prev => ({
      ...prev,
      budget: budgetValue
    }));
  };

  const clearAll = () => {
    setFilters({
      destinationTypes: [],
      climates: [],
      activities: [],
      duration: "",
      budget: BUDGET_OPTIONS[1].value, // Reset to default "50K - 100K"
    });
  };

const handleSave = async (e) => {
  e?.preventDefault?.();
  if (isSubmitting) return; // Prevent double submission

  setIsSubmitting(true);

  try {
    // Input validation
    if (!user?._id && !user?.id) {
      throw new Error('User not authenticated');
    }

    if (!Array.isArray(filters?.destinationTypes) || filters.destinationTypes.length === 0) {
      throw new Error('Please select at least one destination type');
    }

    const selectedBudget = BUDGET_OPTIONS.find(opt => opt.value === filters.budget) || BUDGET_OPTIONS[1];
    if (!selectedBudget) {
      throw new Error('Invalid budget selection');
    }

    const payload = {
      userId: user._id || user.id,
      favouriteDestinationTypes: filters.destinationTypes,
      favouriteActivities: Array.isArray(filters.activities) ? filters.activities : [],
      favouriteClimates: Array.isArray(filters.climates) ? filters.climates : [],
      favouriteDurations: Array.isArray(filters.duration) ? filters.duration : [],
      favouriteBudget: selectedBudget.range?.max || 0,
    };

    console.log("Sending payload to backend:", payload);

    const res = await BACKEND_API.Users.SetFavouriteCategories(payload);

    // console.log("Filter panel response:", res.data);
    // Handle response
    const responseMessage = res?.data?.message || '';
    const isSuccess = res?.data?.status === 200 ||
                      responseMessage.includes('successfully');

    if (!isSuccess) {
      throw new Error(responseMessage || 'Failed to save preferences');
    }

    // Update user context with new preferences
    // updateUser(user);

    toast.success("Preferences saved successfully!");
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  } catch (err) {
    console.error('Error saving preferences:', err);
    const errorMessage = err?.response?.data?.message ||
                        err?.message ||
                        'Failed to save preferences';

    if (errorMessage !== 'Favourite preferences updated successfully') {
      toast.error(errorMessage);
    }
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
              <div className="space-y-4">
                <h3 className="text-base font-medium text-gray-700">Budget Range</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {BUDGET_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleBudgetSelect(option.value)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        filters.budget === option.value
                          ? 'bg-gradient-to-r from-teal-500 to-indigo-600 text-white shadow-md'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-teal-300 hover:bg-teal-50'
                      }`}
                    >
                      <div className="font-semibold">{option.label}</div>
                      <div className="text-xs opacity-80">{option.value}</div>
                    </button>
                  ))}
                </div>
              </div>
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

// ...

const handleSave = async (e) => {
  e?.preventDefault();
  setIsSubmitting(true);
  try {
    if (!filters?.destinationTypes?.length) {
      throw new Error('Please select at least one destination type');
    }

    const selectedBudget = BUDGET_OPTIONS.find(opt => opt.value === filters.budget) || BUDGET_OPTIONS[1];

    const payload = {
      userId: user?._id || user?.id,
      favouriteDestinationTypes: filters.destinationTypes,
      favouriteActivities: filters.activities,
      favouriteClimates: filters.climates,
      favouriteDurations: filters.duration,
      favouriteBudget: selectedBudget.range.max,
    };

    console.log("Sending payload to backend:", payload);

    const res = await BACKEND_API.Users.SetFavouriteCategories(payload);

    if (!res?.data?.success) {
      throw new Error(res?.data?.message || "Failed to save preferences");
    }

    // Update user context with new preferences
    updateUser({
      ...user,
      ...payload
    });

    toast.success("Preferences saved successfully!");
    if (onClose) onClose();

  } catch (err) {
    console.error('Error saving preferences:', err);
    toast.error(err.message || "Failed to save preferences");
  } finally {
    setIsSubmitting(false);
  }
};

const FilterSection = ({ title, items, selected, toggle, color, multiSelect }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium text-gray-700">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => toggle(item)}
            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              selected.includes(item)
                ? `bg-gradient-to-r from-${color}-500 to-${color}-600 text-white shadow-md`
                : `bg-white text-gray-700 border border-gray-300 hover:border-${color}-300 hover:bg-${color}-50`
            }`}
          >
            <div className="font-semibold">{item}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
