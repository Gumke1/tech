import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilmForm from '../../organisms/filmForm/FilmForm';
import Header from '../../templates/Header';
import axios from 'axios';

interface MovieData {
    actor: string;
    description: string;
    director: string;
    id: number;
    link: string;
    runtime: string;
    stars: string;
    tags: string;
    title: string;
    year: string;
}

const FilmpPage = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MovieData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchMovie = async (movieId: string) => {
            setLoading(true);
            setError(null);

            try {
                //Явно указан адрес сервера
                const response = await axios.get(`http://127.0.0.1:8000/movie/${movieId}`);
                console.log("Данные с сервера:", response.data);

                //ПРОВЕРКА И ИЗВЛЕЧЕНИЕ ДАННЫХ ИЗ ОБЪЕКТА movie
                if (response.data && typeof response.data === 'object' && response.data.movie && Array.isArray(response.data.movie) && response.data.movie.length > 0) {
                    setMovie(response.data.movie[0]); // Получаем объект из массива внутри свойства movie
                } else {
                    setError(new Error("Неверный формат данных с сервера"));
                    console.error("Неверный формат данных с сервера:", response.data);
                }


            } catch (err: any) {
                console.error("Ошибка при получении данных о фильме:", err);
                setError(err instanceof Error ? err : new Error(String(err)));
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMovie(id);
        }
    }, [id]);

    if (loading) {
        return (
            <div>
                <Header />
                <p>Загрузка...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Header />
                <p>Ошибка при загрузке данных о фильме: {error.message}</p>
            </div>
        );
    }

    return (
        <div>
            <Header />
            {/*  ПРОВЕРКА, ЧТО MOVIE НЕ NULL */}
            {movie ? (
                //  Передаем movie в FilmForm
                <FilmForm
                    title={movie.title}
                    imageUrl={movie.link}
                    description={movie.description}
                    actor={movie.actor}
                    director={movie.director}
                    runtime={movie.runtime}
                    stars={movie.stars}
                    tags={movie.tags}
                    year={movie.year}
                />
            ) : (
                <p>Фильм не найден.</p>
            )}
        </div>
    );
};

export default FilmpPage;