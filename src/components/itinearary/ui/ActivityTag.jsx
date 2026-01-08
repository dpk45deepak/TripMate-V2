import React from 'react';

const ActivityTag = ({ icon, label, colorClass = "bg-slate-100 text-slate-600" }) => {
    return (
        <div className={`${colorClass} px-3 py-2 rounded-xl flex items-center gap-2 text-[11px] font-bold border border-white shadow-sm hover:brightness-95 transition-all cursor-pointer`}>
            {icon && <span className="opacity-80">{icon}</span>}
            <span className="whitespace-nowrap">{label}</span>
        </div>
    );
};

export default ActivityTag;