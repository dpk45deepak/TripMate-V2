import React from 'react';

const StatCard = ({ label, value, variant = "default" }) => {
    const styles = {
        default: "bg-white text-slate-800 border-slate-100",
        success: "bg-[#E7F6EC] text-[#0D9488] border-white",
    };

    return (
        <div className={`${styles[variant]} rounded-2xl p-4 shadow-sm border text-center transition-transform hover:scale-105 cursor-default`}>
            <p className="text-2xl font-black">{value}</p>
            <p className={`text-[10px] font-bold uppercase tracking-wider ${variant === 'default' ? 'text-slate-400' : 'opacity-60'}`}>
                {label}
            </p>
        </div>
    );
};

export default StatCard;