import React, { useState } from "react";
import "../index.css"; 

type optionType = {
  poster: string;
  title: string;
  year: string;
  summary: string;
};

const Moviecard = ({ poster, title, summary, year }: optionType) => {
  const [isFlipped, setFlip] = useState<boolean>(false);

  const handleflip = () => {
    setFlip(!isFlipped);
  };

  return (
    <div onClick={handleflip} className="moviecard-container">
      {isFlipped ? (
        <div className="moviecard-back">
          <h4 className="moviecard-back2">{title}</h4>
          <p className="moviecard-back3">
            {year && (
              <>
                {year}
                <br />
              </>
            )}
            {summary}
          </p>
        </div>
      ) : (
        <img
          src={poster}
          alt={title}
          className="moviecard-front-img"
        />
      )}
    </div>
  );
};

export default Moviecard;