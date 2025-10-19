import icons  from "./Icons";

// Enhanced Filter Bar with more options
const FilterBar = ({
    activeFilters,
    onFilterChange,
    resultsCount,
    tripType,
    onTripTypeChange,
    viewMode,
    onViewModeChange,
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <icons.Filter className="w-5 h-5 text-indigo-500 mr-2" />
                        <span className="font-semibold text-gray-700">Filters</span>
                        {resultsCount > 0 && (
                            <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">
                                {resultsCount} results
                            </span>
                        )}
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
                        <button
                            className={`p-2 rounded-md transition-all ${viewMode === "grid"
                                    ? "bg-white shadow-sm text-indigo-600"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => onViewModeChange("grid")}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                />
                            </svg>
                        </button>
                        <button
                            className={`p-2 rounded-md transition-all ${viewMode === "list"
                                    ? "bg-white shadow-sm text-indigo-600"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => onViewModeChange("list")}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {/* Trip Type Filter */}
                    <div className="flex items-center space-x-2">
                        <select
                            value={tripType}
                            onChange={(e) => onTripTypeChange(e.target.value)}
                            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="All">All Types</option>
                            <option value="Domestic">Domestic</option>
                            <option value="Foreign">Foreign</option>
                        </select>
                    </div>

                    {/* Season Filter */}
                    <div className="flex items-center space-x-2">
                        <select
                            value={activeFilters.season}
                            onChange={(e) => onFilterChange("season", e.target.value)}
                            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="All">All Seasons</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Autumn">Autumn</option>
                            <option value="Winter">Winter</option>
                        </select>
                    </div>

                    {/* Difficulty Filter */}
                    <div className="flex items-center space-x-2">
                        <select
                            value={activeFilters.difficulty}
                            onChange={(e) => onFilterChange("difficulty", e.target.value)}
                            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="All">All Levels</option>
                            <option value="Easy">Easy</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Challenging">Challenging</option>
                        </select>
                    </div>

                    {/* Price Range Filter */}
                    <div className="flex items-center space-x-2">
                        <select
                            value={activeFilters.priceRange}
                            onChange={(e) => onFilterChange("priceRange", e.target.value)}
                            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="All">Any Price</option>
                            <option value="0-10000">Under ₹10k</option>
                            <option value="10000-25000">₹10k - ₹25k</option>
                            <option value="25000-50000">₹25k - ₹50k</option>
                            <option value="50000+">Over ₹50k</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FilterBar;