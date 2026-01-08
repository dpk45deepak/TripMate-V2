import React from 'react';
import { motion } from 'framer-motion';

const BudgetDonutChart = () => {
    const data = [
        { label: 'Travel', value: 30, color: '#22D3EE' }, // Cyan
        { label: 'Hotel', value: 25, color: '#F472B6' }, // Pink
        { label: 'Food', value: 20, color: '#FB923C' }, // Orange
        { label: 'Activities', value: 25, color: '#4ADE80' }, // Green
    ];

    // SVG Math for the donut segments
    let cumulativePercent = 0;

    return (
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 h-full flex flex-col justify-center">
            <h3 className="font-bold mb-6 flex items-center gap-2">
                Budget Overview <span className="text-orange-400">ⓘ</span>
            </h3>

            <div className="relative flex justify-center items-center">
                <svg viewBox="0 0 100 100" className="w-48 h-48 -rotate-90">
                    {data.map((item, i) => {
                        const startPercent = cumulativePercent;
                        cumulativePercent += item.value;

                        // Calculate SVG stroke-dasharray
                        const dashArray = `${item.value} ${100 - item.value}`;
                        const dashOffset = -startPercent;

                        return (
                            <motion.circle
                                key={i}
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke={item.color}
                                strokeWidth="12"
                                strokeDasharray={dashArray}
                                strokeDashoffset={dashOffset}
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: i * 0.2 }}
                            />
                        );
                    })}
                </svg>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-slate-800">₹20,000</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Amount In Budget</span>
                    <div className="mt-1 flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                        <span className="w-3 h-3 bg-blue-500 rounded-sm"></span>
                        <span className="text-[10px] font-bold text-slate-600">Food</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetDonutChart;