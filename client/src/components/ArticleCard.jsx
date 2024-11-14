import React from "react";

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-gray-800 bg-opacity-80 p-6 rounded-2xl shadow-lg w-full max-w-md text-white flex flex-col h-auto justify-between">
      <img
        src={article.imgSrc}
        alt={article.title}
        className="rounded-lg mb-4 h-56 w-full object-cover"
      />
      <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
      <p className="text-gray-300 mb-4">{article.description}</p>
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-lg text-center transition duration-300 ease-in-out self-start"
      >
        Read More
      </a>
    </div>
  );
};

export default ArticleCard;
