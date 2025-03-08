import React from 'react';
import SearcherMovieCard from '../../molecules/movieCard/SearcherMovieCard';
import { MovieData } from '../../molecules/movieSearch/MovieSearch';

interface ListMovieCardsProps {
    movies: MovieData[] | null;
}

const ListMovieCards: React.FC<ListMovieCardsProps> = ({ movies }) => {
    if (!movies) {
        return <p>Поиск фильмов...</p>;
    }

    return (
        <div className="mt-16">
            {movies.map((movie) => (
                <SearcherMovieCard
                    key={movie.id}
                    title={movie.title}
                    description={movie.description}
                    imageUrl={movie.imageUrl} // Убедись, что это правильное свойство
                    link={`/movie/${movie.id}`} // Убедись, что это правильный путь
                />
            ))}
        </div>
    );
};

export default ListMovieCards;