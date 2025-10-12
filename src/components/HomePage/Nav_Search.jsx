import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

export default function AnimatedSearch({
  onSearch,
  placeholder = "Search...",
  autoFocus = false,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const searchRef = useRef(null);

  // Focus management
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        setQuery("");
        onSearch?.("");
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onSearch]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        if (open && !query) {
          setOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, query]);

  const handleToggle = () => {
    const newOpenState = !open;
    setOpen(newOpenState);

    if (!newOpenState) {
      setQuery("");
      onSearch?.("");
    }
  };

  const handleClear = () => {
    setQuery("");
    onSearch?.("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
    // Optionally close after search on mobile
    if (window.innerWidth < 640) {
      // setOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  return (
    <div ref={searchRef} className={`relative flex items-center ${className}`}>
      {/* Search Button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label={open ? "Close search" : "Open search"}
        className={`
          p-2 rounded-xl transition-all duration-300 ease-out
          flex items-center justify-center
          ${
            open
              ? "text-gray-500 hover:text-gray-700 hover:bg-gray-100 scale-90"
              : "text-blue-500 hover:text-blue-600 hover:bg-blue-50"
          }
          ${isFocused ? "ring-2 ring-blue-200 ring-opacity-50" : ""}
        `}
      >
        {open ? (
          <X className="w-5 h-5 transition-transform duration-200" />
        ) : (
          <Search className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
        )}
      </button>

      {/* Animated Search Box */}
      <div
        className={`
          absolute right-0 top-0 overflow-hidden transition-all duration-300 ease-out
          ${
            open
              ? "w-48 sm:w-64 opacity-100 translate-x-0 scale-100"
              : "w-0 opacity-0 translate-x-3 scale-95"
          }
        `}
      >
        <form onSubmit={handleSubmit} className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoFocus={autoFocus}
            className={`
              p-2 pl-3 pr-8 text-sm border rounded-xl bg-white shadow-sm
              transition-all duration-200 w-full
              focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-100
              ${
                isFocused
                  ? "border-blue-500 shadow-md"
                  : "border-gray-300 hover:border-gray-400"
              }
            `}
            aria-label="Search input"
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="
                absolute right-2 top-1/2 transform -translate-y-1/2 
                p-1 text-gray-400 hover:text-gray-600 
                transition-colors duration-200 rounded-full hover:bg-gray-100
              "
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </form>
      </div>

      {/* Search shortcut hint */}
      {!open && (
        <div
          className="
          absolute -bottom-6 left-1/2 transform -translate-x-1/2
          text-xs text-gray-400 opacity-0 group-hover:opacity-100 
          transition-opacity duration-200 pointer-events-none
          bg-white px-2 py-1 rounded border border-gray-200
        "
        >
          Click to search
        </div>
      )}
    </div>
  );
}
