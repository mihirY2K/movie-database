import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; 

const Homepage = () => {
  const navigate = useNavigate();
  const [newTitle, setNewTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  const handleSearch = async () => {
    if (!newTitle.trim()) return;

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
          newTitle.trim()
        )}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setError(null);
        navigate(`/search?q=${encodeURIComponent(newTitle.trim())}`);
      } else {
        setError(data.Error || "Cannot find it.");
      }
    } catch {
      setError("Error searching movies.");
    }
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Movie Search</h1>
      <div className="search-container">
        <input
          type="search"
          placeholder="Search for a movie..."
          value={newTitle}
          className="search-input"
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {error && <p className="homepage-error">{error}</p>}
    </div>
  );
};

export default Homepage;