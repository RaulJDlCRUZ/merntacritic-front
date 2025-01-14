import React from 'react';

export default function Punctuation({ metascore }) {
    const score = metascore || 'tbd'
    const getColor = (score) => {
        if (score > 80) return 'bg-green-500';
        if (score > 50) return 'bg-yellow-500';
        if (score >= 0) return 'bg-red-500';
        return 'bg-black';
    };
    const colorClass = getColor(metascore);
    return (
    <span className={`inline-block ${colorClass} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
        {score}
    </span>
  );
}