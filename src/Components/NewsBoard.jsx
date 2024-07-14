import { useState, useEffect } from "react";
import NewsItem from './NewsItem';

export default function NewsBoard({ category }) {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const apiKey = import.meta.env.VITE_API_KEY;
                const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setArticles(data.articles || []);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error);
                setArticles([]); // Set articles to an empty array on error
            }
        };

        fetchArticles();
    }, [category]);

    if (error) {
        return <div>Error fetching articles: {error.message}</div>;
    }

    return (
        <div>
            <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
            {articles && articles.length > 0 ? (
                articles.map((news, index) => (
                    <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url} />
                ))
            ) : (
                <p>No news articles available.</p>
            )}
        </div>
    );
}
