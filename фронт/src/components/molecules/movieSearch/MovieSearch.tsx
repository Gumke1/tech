import React, { useState, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';

export interface MovieData {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
}

interface MovieSearchProps {
    onSearch: (movies: MovieData[]) => void;
}

interface ApiResponse {
    films?: {
        id: number;
        title: string;
        description: string;
        link: string;
        [key: string]: any;
    }[];
    error?: string[];
}

const MovieSearch: React.FC<MovieSearchProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);

        if (query.trim()) {
            try {
                const response = await axios.post<ApiResponse>(
                    `http://127.0.0.1:8000/search_by_gpt`,
                    { query: query }
                );

                const data = response.data;
                console.log("Data from server:", data); // Debugging

                if (data && typeof data === 'object' && data.films) {
                    const formattedMovies: MovieData[] = data.films.map((film) => ({
                        id: film.id,
                        title: film.title || 'Unknown Title',
                        description: film.description || 'No Description',
                        imageUrl: film.link || '', // Use the link as the image URL
                        link: `/#/movies/${film.id}`, // Keep the movie link as before
                    }));
                    console.log("Formatted Movies:", formattedMovies); // Debugging
                    onSearch(formattedMovies);
                } else if (data && typeof data === 'object' && data.error && Array.isArray(data.error)) {
                    setError(data.error[0]); // Show server error
                    onSearch([]);
                } else if (typeof data === 'string') {
                    setError(data);
                    console.error("String error from server:", data);
                    onSearch([]);
                } else if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'string') {
                    setError(data[0]);
                    console.error("Array error from server:", data);
                    onSearch([]);
                } else {
                    console.warn('Unexpected data format from server:', data);
                    setError('Unexpected data format from server.');
                    onSearch([]);
                }
            } catch (err: any) {
                const axiosError = err as AxiosError;
                console.error('There was an error making the request:', axiosError);
                setError(`Error: ${axiosError.message}`);
                if (axiosError.response) {
                    console.log(axiosError.response.data);
                }
                onSearch([]);
            }
        }
    };

    return (
        <div className="w-full">
            <form className="max-w-3xl mx-auto" onSubmit={handleSubmit}>
                <div className="flex">
                    <div className="relative w-full">
                        <input
                            type="search"
                            id="search-dropdown"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                console.log("Query:", e.target.value); // Debugging
                            }}
                            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search film..."
                            required
                        />
                        <button
                            type="submit"
                            className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
};

export default MovieSearch;