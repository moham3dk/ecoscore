import React, { useState, useEffect } from "react";
import { getArticles } from "../services/api";
import ArticleCard from "../components/ArticleCard";
import Navbar from "../components/Navbar";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        if (data.error) {
          setError(data.error);
        } else {
          setArticles(data);
        }
      } catch (err) {
        setError("Failed to load articles.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-blue-500">
        <p className="text-white text-2xl font-bold">Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-blue-500">
        <p className="text-red-500 text-2xl font-bold">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-500 p-4">
        <div className="bg-black bg-opacity-60 p-12 rounded-3xl shadow-xl max-w-7xl mx-auto mt-20">
          <h1 className="text-4xl font-extrabold text-white text-center leading-tight drop-shadow-lg mb-8">
            Latest Articles
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Articles;
