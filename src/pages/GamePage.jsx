import { useEffect, useState } from 'react';
import axios from "../services/axiosConfig.js"; // Usamos instancia base
import { useParams } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { getColor, getDescription } from '../components/Color-text-select.jsx';

export default function GamePage () {
    const { slug } = useParams();
    const [game, setGame] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('about');

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await axios.get(`/games/${slug}`);
                setGame(response.data.gameDetails);
                setReviews(response.data.gameDetails.reviews);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGame();
    }, [slug]);

    if (loading) return <p>Loading...</p>;
    if (error) return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-6xl text-red-500">Error 404</h1>
                <p className="text-xl text-gray-600">Game not found</p>
            </div>
        </div>
    );

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        });
    };

    /* SCORE BOX DINÁMICA, EN FUNCIÓN DE LA PUNTUACIÓN */
    function ScoreBox ({ score, label }) {
        const displayScore = score === null || score === 'tbd' ? 'tbd' : score;
        const color = getColor(displayScore*10); // la puntuación es sobre 10, no sobre 100
        return (
            <div className={`p-4 rounded-lg ${color} text-white text-center`}>
            <div className="text-3xl font-bold">{displayScore}</div>
            <div className="text-sm mt-1">{label}</div>
            </div>
        );
    }

    const TabButton = ({ id, label, active, onClick }) => (
        <button
        onClick={() => onClick(id)}
        className={`px-6 py-3 font-semibold text-lg transition-colors
            ${active ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
        >
        {label}
        </button>
    );

    /* ABOUT - CONTENIDO GENERAL DEL VIDEOJUEGO */
    const AboutContent = () => {
        const platforms = Array.isArray(game.platform) ? game.platform.join(', ') : game.platform;
        const developers = Array.isArray(game.developer) ? game.developer.join(', ') : game.developer;
        const publishers = Array.isArray(game.publisher) ? game.publisher.join(', ') : game.publisher;
        const genres = Array.isArray(game.genre) ? game.genre.join(', ') : game.genre;
    
        return (
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-semibold mb-4">About</h3>
                    <p className="text-gray-700 leading-relaxed">{game.description}</p>
                </div>
    
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Information</h3>
                        <dl className="space-y-2">
                            <div className="flex">
                                <dt className="w-32 font-medium text-gray-600">Platform</dt>
                                <dd>{platforms}</dd>
                            </div>
                            <div className="flex">
                                <dt className="w-32 font-medium text-gray-600">Release Date</dt>
                                <dd>{formatDate(game.release_date)}</dd>
                            </div>
                            <div className="flex">
                                <dt className="w-32 font-medium text-gray-600">Developer</dt>
                                <dd>{developers}</dd>
                            </div>
                            <div className="flex">
                                <dt className="w-32 font-medium text-gray-600">Publisher</dt>
                                <dd>{publishers}</dd>
                            </div>
                            <div className="flex">
                                <dt className="w-32 font-medium text-gray-600">Genre</dt>
                                <dd>{genres}</dd>
                            </div>
                        </dl>
                    </div>
    
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Features</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {game.game_features?.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            )) || <li>No features available</li>}
                        </ul>
                    </div>
                </div>
    
                <div>
                    <h3 className="text-xl font-semibold mb-4">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                        {game.supported_languages?.map((language, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                {language}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    /* GESTIÓN DE RESEÑAS */

    const ReviewCard = ({ review }) => (
        <div className="border-b border-gray-200 py-6 last:border-0">
        <div className="flex justify-between items-start mb-4">
            <div>
            <h4 className="font-semibold text-lg">{review.username}</h4>
            <div className="text-sm text-gray-500">
                {formatDate(review.date)} • {review.hours_played} hours played
            </div>
            </div>
            <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium
                ${review.recommendation === 'Highly Recommended' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                {review.recommendation}
            </span>
            </div>
        </div>
        <p className="text-gray-700 mb-4">{review.review_text}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Score: {review.review_score}/10</span>
            <span>• {review.review_votes} found this helpful</span>
        </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="md:flex">
                {/* Game Cover */}
                <div className="md:w-1/3 bg-gray-200 h-[400px]"></div>
                
                {/* Game Info */}
                <div className="p-6 md:w-2/3">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{game.title}</h1>
                    <div className="flex gap-4 mb-6">
                        <ScoreBox score={game.metascore} label="Metascore" />
                        <ScoreBox score={game.user_score} label="User Score" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Release Date:</span>
                            <span className="font-medium">
                                {new Date(game.release_date).getTime() === 0 ? 'Unknown' : formatDate(game.release_date)}
                            </span>
                        </div>
                        {game.price && (
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">Price:</span>
                                <span className="font-medium">
                                    ${game.discounted_price || game.price}
                                </span>
                                {game.discounted_price && (
                                    <span className="line-through text-gray-400">${game.price}</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                </div>
                </div>

                {/* Tabs Navigation */}
            <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="border-b border-gray-200">
                <div className="flex gap-4 px-4">
                <TabButton
                    id="about"
                    label="About"
                    active={activeTab === 'about'}
                    onClick={setActiveTab}
                />
                <TabButton
                    id="reviews"
                    label="Reviews"
                    active={activeTab === 'reviews'}
                    onClick={setActiveTab}
                />
                </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
                {activeTab === 'about' ? (
                <AboutContent />
                ) : (
                <div>
                    <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Community Reviews</h3>
                    {game.reviews_count ? (
                        <p className="text-gray-600">Based on {game.reviews_count.toLocaleString()} reviews</p>
                    ) : (
                        <p className="text-gray-600">No reviews available</p>
                    )}
                    </div>
                    
                    <div className="space-y-6">
                    {reviews.recent.map((review, index) => (
                        <ReviewCard key={index} review={review} />
                    ))}
                    </div>

                    <div className="mt-8 text-center">
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <MessageSquare size={20} />
                        View All Reviews
                    </button>
                    </div>
                </div>
                )}
            </div>
            </div>
        </div>
        </div>
    );
}