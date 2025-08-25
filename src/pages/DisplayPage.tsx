import React from "react"; 
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieCard from "./Moviecard";
import "../index.css"; 

const DisplayPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const q = searchParams.get("q");
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    if (!q) {
      setError("No Movie");
      return;
    }

    const getSearchTitle = async (term: string) => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${term}`
        );
        const data = await res.json();

        if (data.Response === "True") {
          const searchResults = data.Search;

          const updatedRes = await Promise.all(
            searchResults.map(async (item: any) => {
              const detailRes = await fetch(
                `https://www.omdbapi.com/?apikey=${apiKey}&i=${item.imdbID}&plot=full`
              );
              const detailData = await detailRes.json();
              return {
                ...item,
                Plot: detailData.Plot,
              };
            })
          );

          setResults(updatedRes);
        } else {
          setResults([]);
          setError(data.Error || "No results found.");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching movies.");
      }
    };

    getSearchTitle(q);
  }, [searchParams]);

  const handleBack = () => {
    navigate(`/`);
  };

  return (
    <div className="display-page-container">
      <div className="display-header">
        <button onClick={handleBack} className="back-button">
          <span className="back-button-arrow">←</span> Back
        </button>
        <h1 className="display-title">Search Results for "{q}"</h1>
      </div>
      {error ? (
        <p className="display-error">{error}</p>
      ) : (
        <div className="results-container">
          {results.map((item) => (
            <MovieCard
              key={item.imdbID}
              title={item.Title}
              year={item.Year}
              poster={item.Poster}
              summary={item.Plot}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayPage;