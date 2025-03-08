import React from 'react';
import LoginButton from "../atoms/buttons/LoginButton";
import RegButton from "../atoms/buttons/RegButton";
import MovieSearch from "../molecules/movieSearch/MovieSearch";
import { MovieData } from "../molecules/movieSearch/MovieSearch";

interface HeaderProps {
    onSearch?: (movies: MovieData[]) => void; // Сделали пропс необязательным
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const handleClick = () => {
        window.location.href = "/moviesearch";
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 p-3 gap-5 items-center shadow-md justify-between">
            <h1 onClick={handleClick} className="font-bold text-center text-2xl col-span-1 md:col-span-1 cursor-pointer">MoviesFilm</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-4 items-center">
                <MovieSearch onSearch={onSearch ?? (() => {})} /> {/* onSearch теперь может быть undefined */}
                <div className="grid grid-cols-2 mx-auto gap-2 pt-2">
                    <LoginButton aria-label="Войти в аккаунт"/>
                    <RegButton aria-label="Зарегистрироваться"/>
                </div>
            </div>
        </div>
    );
};

export default Header;