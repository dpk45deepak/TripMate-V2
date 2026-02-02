import React, { useState, useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Download, Filter, ChevronDown, CheckCircle, XCircle, Clock, DollarSign, Calendar, Receipt } from 'lucide-react';
import AuthContext from "../../Context/AuthContext";
import BACKEND_API from "../../Services/Backend";

const Transactions = () => {
    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending', 'failed'
    const [view, setView] = useState('list'); // 'list', 'grid'
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [showDetail, setShowDetail] = useState(false);

    React.useEffect(() => {
        const fetchTransactions = async () => {
            if (!user?._id) return;

            try {
                setLoading(true);
                const response = await BACKEND_API.Transactions.getUserTransactions(user._id);
                setTransactions(response.data || []);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setTransactions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [user]);

    const filteredTransactions = useMemo(() => {
        let filtered = [...transactions];

        if (filter !== 'all') {
            filtered = filtered.filter(t => t.status === filter);
        }

        return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [transactions, filter]);

    const stats = useMemo(() => {
        const completed = transactions.filter(t => t.status === 'completed');
        const pending = transactions.filter(t => t.status === 'pending');
        const failed = transactions.filter(t => t.status === 'failed');

        return {
            total: transactions.length,
            completed: completed.length,
            pending: pending.length,
            failed: failed.length,
            totalAmount: completed.reduce((sum, t) => sum + (t.amount || 0), 0),
            pendingAmount: pending.reduce((sum, t) => sum + (t.amount || 0), 0)
        };
    }, [transactions]);

    const viewTransaction = (transaction) => {
        setSelectedTransaction(transaction);
        setShowDetail(true);
    };

    const downloadReceipt = async (transactionId) => {
        try {
            // Implement receipt download logic
            console.log('Downloading receipt for:', transactionId);
        } catch (error) {
            console.error('Error downloading receipt:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Transactions</h1>
                    <p className="text-gray-600">View and manage your payment history</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        title="Total Spent"
                        value={`Rs. ${stats.totalAmount.toLocaleString()}`}
                        icon={DollarSign}
                        color="emerald"
                    />
                    <StatCard
                        title="Completed"
                        value={stats.completed}
                        icon={CheckCircle}
                        color="green"
                    />
                    <StatCard
                        title="Pending"
                        value={stats.pending}
                        icon={Clock}
                        color="amber"
                    />
                    <StatCard
                        title="Failed"
                        value={stats.failed}
                        icon={XCircle}
                        color="red"
                    />
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex space-x-2">
                                {['all', 'completed', 'pending', 'failed'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilter(status)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === status
                                                ? `bg-${status === 'completed' ? 'green' : status === 'pending' ? 'amber' : status === 'failed' ? 'red' : 'emerald'}-500 text-white`
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </button>
                                ))}
                            </div>

                            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                                <option>Last 30 days</option>
                                <option>Last 90 days</option>
                                <option>This year</option>
                                <option>All time</option>
                            </select>
                        </div>

                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setView(view === 'list' ? 'grid' : 'list')}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                {view === 'list' ? 'Grid View' : 'List View'}
                            </button>

                            <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
                                <Download className="w-4 h-4" />
                                <span>Export</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Transactions */}
                {filteredTransactions.length === 0 ? (
                    <EmptyTransactions />
                ) : view === 'list' ? (
                    <div className="space-y-3">
                        {filteredTransactions.map((transaction) => (
                            <TransactionItem
                                key={transaction._id}
                                transaction={transaction}
                                onView={viewTransaction}
                                onDownload={downloadReceipt}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTransactions.map((transaction) => (
                            <TransactionCard
                                key={transaction._id}
                                transaction={transaction}
                                onView={viewTransaction}
                                onDownload={downloadReceipt}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Transaction Detail Modal */}
            {showDetail && selectedTransaction && (
                <TransactionDetail
                    transaction={selectedTransaction}
                    onClose={() => setShowDetail(false)}
                    onDownload={downloadReceipt}
                />
            )}
        </div>
    );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-600">{title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            </div>
            <div className={`p-3 rounded-lg bg-${color}-50`}>
                <Icon className={`w-6 h-6 text-${color}-500`} />
            </div>
        </div>
    </div>
);

const TransactionItem = ({ transaction, onView, onDownload }) => {
    const getStatusConfig = (status) => {
        switch (status) {
            case 'completed':
                return { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle };
            case 'pending':
                return { color: 'text-amber-600', bg: 'bg-amber-50', icon: Clock };
            case 'failed':
                return { color: 'text-red-600', bg: 'bg-red-50', icon: XCircle };
            default:
                return { color: 'text-gray-600', bg: 'bg-gray-50', icon: Clock };
        }
    };

    const statusConfig = getStatusConfig(transaction.status);
    const StatusIcon = statusConfig.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${statusConfig.bg}`}>
                        <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-900">{transaction.description}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(transaction.date).toLocaleDateString()}
                            <span className="mx-2">•</span>
                            <CreditCard className="w-3 h-3 mr-1" />
                            {transaction.method}
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className="font-semibold text-gray-900">
                            Rs. {transaction.amount?.toLocaleString()}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${statusConfig.bg} ${statusConfig.color}`}>
                            {transaction.status}
                        </span>
                    </div>

                    <div className="flex space-x-2">
                        <button
                            onClick={() => onView(transaction)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            aria-label="View details"
                        >
                            <Receipt className="w-4 h-4 text-gray-500" />
                        </button>
                        <button
                            onClick={() => onDownload(transaction._id)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            aria-label="Download receipt"
                        >
                            <Download className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const TransactionCard = ({ transaction, onView, onDownload }) => {
    const getStatusConfig = (status) => {
        switch (status) {
            case 'completed':
                return { color: 'border-green-200 bg-green-50 text-green-700' };
            case 'pending':
                return { color: 'border-amber-200 bg-amber-50 text-amber-700' };
            case 'failed':
                return { color: 'border-red-200 bg-red-50 text-red-700' };
            default:
                return { color: 'border-gray-200 bg-gray-50 text-gray-700' };
        }
    };

    const statusConfig = getStatusConfig(transaction.status);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{transaction.description}</h3>
                    <p className="text-sm text-gray-500">{transaction.method}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${statusConfig.color} border`}>
                    {transaction.status}
                </span>
            </div>

            <div className="mb-4">
                <p className="text-2xl font-bold text-gray-900">
                    Rs. {transaction.amount?.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {new Date(transaction.date).toLocaleDateString()}
                </p>
            </div>

            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                    ID: {transaction._id?.slice(-8) || 'N/A'}
                </span>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onView(transaction)}
                        className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                    >
                        Details
                    </button>
                    <button
                        onClick={() => onDownload(transaction._id)}
                        className="text-gray-600 hover:text-gray-700"
                        aria-label="Download"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const TransactionDetail = ({ transaction, onClose, onDownload }) => {
    const getStatusConfig = (status) => {
        switch (status) {
            case 'completed':
                return { color: 'text-green-600', bg: 'bg-green-50' };
            case 'pending':
                return { color: 'text-amber-600', bg: 'bg-amber-50' };
            case 'failed':
                return { color: 'text-red-600', bg: 'bg-red-50' };
            default:
                return { color: 'text-gray-600', bg: 'bg-gray-50' };
        }
    };

    const statusConfig = getStatusConfig(transaction.status);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Transaction Details</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-4">
                        <DetailRow label="Transaction ID" value={transaction._id} />
                        <DetailRow label="Description" value={transaction.description} />
                        <DetailRow label="Date" value={new Date(transaction.date).toLocaleString()} />
                        <DetailRow label="Payment Method" value={transaction.method} />
                        <DetailRow label="Amount" value={`Rs. ${transaction.amount?.toLocaleString()}`} />
                        <DetailRow label="Status" value={
                            <span className={`px-2 py-1 rounded-full text-sm ${statusConfig.bg} ${statusConfig.color}`}>
                                {transaction.status}
                            </span>
                        } />

                        {transaction.items && (
                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">Items</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    {transaction.items.map((item, index) => (
                                        <div key={index} className="flex justify-between py-2 border-b last:border-0">
                                            <span>{item.name}</span>
                                            <span>Rs. {item.price?.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex justify-end space-x-3">
                        <button
                            onClick={() => onDownload(transaction._id)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Download Receipt
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const DetailRow = ({ label, value }) => (
    <div className="flex justify-between py-3 border-b border-gray-100">
        <span className="text-gray-600">{label}</span>
        <span className="text-gray-900 font-medium">{value}</span>
    </div>
);

const EmptyTransactions = () => (
    <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <CreditCard className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
        <p className="text-gray-500 mb-6">
            Your transaction history will appear here once you make a booking
        </p>
        <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600">
            Book Now
        </button>
    </div>
);

export default Transactions;