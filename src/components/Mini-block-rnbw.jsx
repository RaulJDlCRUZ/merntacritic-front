import React from 'react';
import { getColor, getDescription } from './Color-text-select.jsx';

export default function Punctuation({ metascore }) {
    const score = metascore || 'tbd';
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