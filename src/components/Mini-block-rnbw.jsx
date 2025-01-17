import React from 'react';

export default function Punctuation({ metascore }) {
    const score = metascore || 'tbd';
    const getColor = (score) => {
        if (score === 'tbd') return 'bg-black';
        if (score > 80) return 'bg-green-500';
        if (score > 50) return 'bg-yellow-500';
        if (score >= 0) return 'bg-red-500';
        return 'bg-black';
    };
    const getDescription = (score) => {
        if (score === 'tbd') return '';
        if (score >= 90) return 'Universal Acclaim';
        if (score >= 75) return 'Generally Favorable';
        if (score >= 50) return 'Mixed or Average';
        if (score >= 20) return 'Generally Unfavorable';
        if (score >= 0) return 'Overwhelming Dislike';
        return '';
    };
    const description = getDescription(score);
    const colorClass = getColor(score);
    return (
        <div>
            <span className="mr-2">{description}</span>
            <span className={`inline-block ${colorClass} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                {score}
            </span>
        </div>
    );
}

/*
METER AL LADO UN TEXTO DE "FAVORABLE" ... EN ESTE MISMO COMPONENTE PARA AHORRAR COMPUTACIÓN
0-19: Overwhelming Dislike
20-49: Generally Unfavorable
50-74: Mixed or Average
75-89: Generally Favorable
90-100: Universal Acclaim
*/