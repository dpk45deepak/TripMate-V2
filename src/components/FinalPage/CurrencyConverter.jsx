import React, { useState, useEffect } from "react";

// Enhanced Currency Converter Component
const CurrencyConverter = ({
    basePrice,
    country,
    location,
    compact = false,
}) => {
    // Currency conversion rates (simplified, in a real app, fetch from an API)
    const currencyRates = {
        US: { code: "USD", rate: 0.012, symbol: "$" },
        UK: { code: "GBP", rate: 0.0095, symbol: "£" },
        EU: { code: "EUR", rate: 0.011, symbol: "€" },
        JP: { code: "JPY", rate: 1.8, symbol: "¥" },
        AU: { code: "AUD", rate: 0.018, symbol: "A$" },
        CA: { code: "CAD", rate: 0.016, symbol: "C$" },
        default: { code: "USD", rate: 0.012, symbol: "$" },
    };

    // Get currency info based on country
    const getCurrencyInfo = (countryCode) => {
        if (!countryCode) return currencyRates["default"];

        // Try to match country code (first 2 letters)
        const countryKey = countryCode.substring(0, 2).toUpperCase();
        return currencyRates[countryKey] || currencyRates["default"];
    };

    const [targetCurrency, setTargetCurrency] = useState("USD");
    const [convertedPrice, setConvertedPrice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const convertCurrency = async () => {
            if (!basePrice || !country) return;

            try {
                setLoading(true);
                setError(null);

                // In a real app, you would fetch the latest rates from an API
                // For now, we'll use the static rates defined above
                const currencyInfo = getCurrencyInfo(country);
                setTargetCurrency(currencyInfo.code);

                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 500));

                const converted = basePrice * currencyInfo.rate;
                setConvertedPrice(converted.toFixed(2));
            } catch (err) {
                console.error("Error converting currency:", err);
                setError("Failed to convert currency");
            } finally {
                setLoading(false);
            }
        };

        convertCurrency();
    }, [basePrice, country]);

    // Helper function to get currency symbol
    const getCurrencySymbol = (currencyCode) => {
        const currency = Object.values(currencyRates).find(
            (c) => c.code === currencyCode
        );
        return currency ? currency.symbol : "$";
    };

    if (compact) {
        return (
            <div className="bg-gradient-to-r from-green-50 to-emerald-100 p-3 rounded-xl border border-green-200">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Price</span>
                    {loading ? (
                        <div className="h-4 w-20 bg-green-200 rounded animate-pulse"></div>
                    ) : convertedPrice ? (
                        <div className="text-right">
                            <div className="font-bold text-green-700">
                                {getCurrencySymbol(targetCurrency)}
                                {convertedPrice}
                            </div>
                            <div className="text-xs text-gray-500">
                                ₹{basePrice?.toLocaleString()}
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm text-gray-500">
                            ₹{basePrice?.toLocaleString()}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Full Currency Converter
    return (
        <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                Currency Converter
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount in INR
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">₹</span>
                        </div>
                        <input
                            type="number"
                            value={basePrice || ""}
                            readOnly
                            className="focus:ring-2 focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                        onClick={() => { }}
                        disabled={loading}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M15.707 4.293a1 1 0 010 1.414L9.414 12l6.293 6.293a1 1 0 01-1.414 1.414l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    <div className="mx-2 text-sm text-gray-500">
                        {targetCurrency} ({getCurrencySymbol(targetCurrency)})
                    </div>

                    <button
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                        onClick={() => { }}
                        disabled={loading}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Converted Amount
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">
                                {getCurrencySymbol(targetCurrency)}
                            </span>
                        </div>
                        <input
                            type="text"
                            value={loading ? "Converting..." : convertedPrice || "--"}
                            readOnly
                            className="bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-4 text-red-600 text-sm bg-red-50 p-2 rounded">
                    {error}
                </div>
            )}

            <div className="mt-4 text-xs text-gray-500">
                <p>
                    1 INR ={" "}
                    {convertedPrice
                        ? (parseFloat(convertedPrice) / basePrice).toFixed(6)
                        : "--"}{" "}
                    {targetCurrency}
                </p>
                <p>
                    1 {targetCurrency} ={" "}
                    {convertedPrice
                        ? (basePrice / parseFloat(convertedPrice)).toFixed(2)
                        : "--"}{" "}
                    INR
                </p>
                <p className="mt-2 text-gray-400">
                    Last updated: {new Date().toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default CurrencyConverter;
