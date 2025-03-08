import React from 'react';
import { Link } from 'react-router-dom';

interface FilmFormProps {
    title: string;
    imageUrl: string;
    description: string;
    actor?: string;
    director?: string;
    runtime?: string;
    stars?: string;
    tags?: string;
    year?: string;
}

const FilmForm = ({
                      title,
                      imageUrl,
                      description,
                      actor,
                      director,
                      runtime,
                      stars,
                      tags,
                      year
                  }: FilmFormProps) => {

    return (
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="w-full md:w-1/3 relative group">
                    <img
                        className="rounded-lg object-cover  transform group-hover:scale-105 transition duration-300 ease-in-out"
                        src={imageUrl}
                        alt={title}
                        style={{objectFit: 'cover', height: '624px', objectPosition: 'center'}}
                    />
                    <div
                        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition duration-300 ease-in-out rounded-lg"></div>
                </div>

                {/* Details */}
                <div className="w-full md:w-2/3 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
                        <p className="text-gray-700 leading-relaxed text-lg">{description}</p>
                        <div className="mt-6 space-y-3">
                            {actor && <p className="text-gray-600 text-lg">В главных ролях: <span className="font-medium">{actor}</span></p>}
                            {director && <p className="text-gray-600 text-lg">Режиссер: <span className="font-medium">{director}</span></p>}
                            {runtime && <p className="text-gray-600 text-lg">Продолжительность: <span className="font-medium">{runtime}</span></p>}
                            {stars && <h3 className="text-gray-600 text-lg font-semibold">Рейтинг: <span className="text-yellow-500">★{stars}</span></h3>}
                            {year && <p className="text-gray-600 text-lg">Год выпуска: <span className="font-medium">{year}</span></p>}
                            {tags && <p className="text-gray-600 text-lg">Жанры: <span className="font-medium">{tags}</span></p>}
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="mt-6">
                        <Link
                            to="/"
                            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-6 w-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Назад
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilmForm;