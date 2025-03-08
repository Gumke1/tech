import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListMovieCards from "../../organisms/lists/ListMovieCards";
import Header from "../../templates/Header";
import { MovieData } from '../../molecules/movieSearch/MovieSearch';

const SearcherPage: React.FC = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState<MovieData[] | null>(null);
    const [searchQuery, setSearchQuery] = useState<MovieData[]>([]);
    const [isLoading, setIsLoading] = useState(false); // Add isLoading state

    const handleSearch = (movies: MovieData[]) => {
        setIsLoading(true); // Set isLoading to true
        setMovies(movies);
        setSearchQuery(movies || []);
        navigate('/moviesearch');
    };

    useEffect(() => {
        console.log("Movies in SearcherPage:", movies);
        console.log("SearchQuery in SearcherPage:", searchQuery);
        setIsLoading(false); // Set isLoading to false when movies are loaded
    }, [movies, searchQuery, navigate]);

    return (
        <div>
            <Header onSearch={handleSearch} />
            {isLoading && <p>Идет поиск...</p>} {/* Display loading indicator */}
            {searchQuery.length > 0 && <ListMovieCards movies={movies} />}
        </div>
    );
};

export default SearcherPage;