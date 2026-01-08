import React from 'react';

const Card = ({ children, className = "", noPadding = false }) => {
    return (
        <div className={`bg-white rounded-[2rem] shadow-sm border border-slate-100 ${!noPadding ? 'p-6' : ''} ${className}`}>
            {children}
        </div>
    );
};

export default Card;