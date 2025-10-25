import React, { useState, useEffect } from "react";

const CurrencyConverter = ({ basePrice: initialBasePrice, country, compact = false }) => {
    const currencyRates = {
        US: { code: "USD", rate: 0.012, symbol: "$" },
        UK: { code: "GBP", rate: 0.0095, symbol: "£" },
        EU: { code: "EUR", rate: 0.011, symbol: "€" },
        JP: { code: "JPY", rate: 1.8, symbol: "¥" },
        AU: { code: "AUD", rate: 0.018, symbol: "A$" },
        CA: { code: "CAD", rate: 0.016, symbol: "C$" },
        default: { code: "USD", rate: 0.012, symbol: "$" },
    };

    const getCurrencyInfo = (countryCode) => {
        if (!countryCode) return currencyRates["default"];
        const countryKey = countryCode.substring(0, 2).toUpperCase();
        return currencyRates[countryKey] || currencyRates["default"];
    };

    const [basePrice, setBasePrice] = useState(initialBasePrice || "");
    const [targetCurrency, setTargetCurrency] = useState("USD");
    const [convertedPrice, setConvertedPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Real-time conversion on input
    useEffect(() => {
        if (!basePrice || isNaN(basePrice) || basePrice <= 0) {
            setConvertedPrice("");
            return;
        }

        const convert = async () => {
            try {
                setLoading(true);
                setError(null);

                const currencyInfo = getCurrencyInfo(country);
                setTargetCurrency(currencyInfo.code);

                await new Promise((resolve) => setTimeout(resolve, 300)); // simulate delay

                const converted = basePrice * currencyInfo.rate;
                setConvertedPrice(converted.toFixed(2));
            } catch (err) {
                console.error(err);
                setError("Failed to convert currency");
            } finally {
                setLoading(false);
            }
        };

        convert();
    }, [basePrice, country]);

    const getCurrencySymbol = (code) => {
        const c = Object.values(currencyRates).find((cur) => cur.code === code);
        return c ? c.symbol : "$";
    };

    // Compact view (minimal card)
    if (compact) {
        return (
            <div className="bg-gradient-to-r from-teal-50 to-indigo-100 p-4 rounded-2xl border border-indigo-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-indigo-700">Converted Price</span>
                    {loading ? (
                        <div className="h-4 w-20 bg-indigo-200 rounded animate-pulse"></div>
                    ) : convertedPrice ? (
                        <div className="text-right">
                            <div className="font-bold text-indigo-800 text-lg">
                                {getCurrencySymbol(targetCurrency)}
                                {convertedPrice}
                            </div>
                            <div className="text-xs text-gray-500">₹{basePrice}</div>
                        </div>
                    ) : (
                        <div className="text-sm text-gray-500">₹{basePrice || 0}</div>
                    )}
                </div>
            </div>
        );
    }

    // Full Converter
    return (
        <div className="bg-gradient-to-br from-white via-indigo-50 to-teal-50 rounded-3xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-indigo-100">
            <h3 className="text-2xl font-extrabold text-indigo-800 mb-5 flex items-center gap-2">
                💱 Currency Converter
            </h3>

            <div className="space-y-5">
                {/* Base Amount */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount in INR
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                            ₹
                        </span>
                        <input
                            type="number"
                            value={basePrice}
                            onChange={(e) => setBasePrice(e.target.value)}
                            placeholder="Enter amount in INR"
                            className="w-full border border-gray-300 rounded-xl p-2 pl-7 pr-12 text-gray-700 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        />
                    </div>
                </div>

                {/* Converted Amount */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Converted Amount ({targetCurrency})
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                            {getCurrencySymbol(targetCurrency)}
                        </span>
                        <input
                            type="text"
                            value={loading ? "Converting..." : convertedPrice || "--"}
                            readOnly
                            className="w-full border border-gray-300 rounded-xl p-2 pl-7 pr-12 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-4 text-red-600 text-sm bg-red-50 p-2 rounded-md">
                    {error}
                </div>
            )}

            {/* Footer info */}
            <div className="mt-5 text-xs text-gray-500 border-t border-indigo-100 pt-3">
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
