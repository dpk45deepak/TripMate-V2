// src/components/BudgetOverview.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const BudgetOverview = ({ budget, breakdown }) => {
    const chartData = [
        { name: 'Travel', value: budget * 0.3, color: '#06b6d4' },
        { name: 'Hotel', value: budget * 0.35, color: '#3b82f6' },
        { name: 'Food', value: budget * 0.2, color: '#f59e0b' },
        { name: 'Activities', value: budget * 0.15, color: '#8b5cf6' },
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
                    <p className="font-semibold text-gray-900">{payload[0].name}</p>
                    <p className="text-lg font-bold text-gray-900">
                        ${payload[0].value.toFixed(0)}
                    </p>
                    <p className="text-sm text-gray-600">
                        {((payload[0].value / budget) * 100).toFixed(1)}% of total
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Budget Overview</h2>
                    <p className="text-gray-600">Visual breakdown of your trip expenses</p>
                </div>
                <div className="flex items-center space-x-6 mt-4 lg:mt-0">
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Total Budget</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ${budget}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Remaining</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            ${(budget * 0.1).toFixed(0)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chart Section */}
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend & Details */}
                <div className="space-y-6">
                    {chartData.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                        >
                            <div className="flex items-center space-x-4">
                                <div
                                    className="h-12 w-12 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${item.color}20` }}
                                >
                                    <div
                                        className="h-6 w-6 rounded"
                                        style={{ backgroundColor: item.color }}
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                    <p className="text-sm text-gray-500">
                                        {((item.value / budget) * 100).toFixed(1)}% • ${item.value.toFixed(0)}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-gray-900">${item.value.toFixed(0)}</p>
                                <div className={`inline-flex items-center text-sm ${index % 2 === 0 ? 'text-emerald-600' : 'text-rose-600'
                                    }`}>
                                    {index % 2 === 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                    <span>{index % 2 === 0 ? '+5.2%' : '-2.1%'}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Insights Card */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
                        <div className="flex items-start space-x-3">
                            <DollarSign className="h-6 w-6 text-cyan-600 mt-1" />
                            <div>
                                <h4 className="font-semibold text-gray-900">Budget Insight</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    Your hotel expenses are 15% higher than average. Consider alternative
                                    accommodations to save ${(budget * 0.35 * 0.15).toFixed(0)}.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetOverview;