export function getColor (score) {
    if (score === 'tbd') return 'bg-black';
    if (score > 80) return 'bg-green-500';
    if (score > 50) return 'bg-yellow-500';
    if (score >= 0) return 'bg-red-500';
    return 'bg-black';
}

export function getDescription (score) {
    if (score === 'tbd' || !score) return 'Unknown';
    if (score >= 90) return 'Universal Acclaim';
    if (score >= 75) return 'Generally Favorable';
    if (score >= 50) return 'Mixed or Average';
    if (score >= 20) return 'Generally Unfavorable';
    if (score >= 0) return 'Overwhelming Dislike';
    return '';
}