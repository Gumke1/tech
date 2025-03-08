import React, { useState } from 'react';

interface SearcherMovieCardProps {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
}

const SearcherMovieCard: React.FC<SearcherMovieCardProps> = ({ title, description, imageUrl, link }) => {
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    const truncatedDescription = description.length > 200 ? description.substring(0, 200) + "..." : description;

    return (
        <div className="mt-5 max-w-5xl mx-auto">
            <div className="w-full flex bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200">
                <img
                    className="object-cover w-48 h-48 rounded-l-lg"
                    src={imageUrl}
                    alt={title}
                />
                <div className="flex flex-col justify-between p-4 leading-normal text-left w-full">
                    <h5 className="mt-0 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {title}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700">{truncatedDescription}</p>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleLike}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {liked ? "♥" : "♡"}
                        </button>
                        <a
                            href={link}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            Подробнее
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearcherMovieCard;