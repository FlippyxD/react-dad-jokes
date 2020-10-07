import React from "react";

import "./Joke.css";

const Joke = ({ votes, upvote, downvote, text }) => {
  //Changes color of the border based on votes
  const getColor = () => {
    if (votes >= 15) return "#4CAF50";
    if (votes >= 12) return "#8BC34A";
    if (votes >= 9) return "#CDDC39";
    if (votes >= 6) return "#FFEB3B";
    if (votes >= 3) return "#FF9800";
    return "#f44336";
  };

  //Changes emoji of the border based on votes
  const getEmoji = () => {
    if (votes >= 15) return "em em-rolling_on_the_floor_laughing";
    if (votes >= 12) return "em em-laughing";
    if (votes >= 9) return "em em-smiley";
    if (votes >= 6) return "em em-slightly_smiling_face";
    if (votes >= 3) return "em em-neutral_face";
    if (votes >= 0) return "em em-confused";
    return "em em-angry";
  };

  return (
    <div className="Joke">
      <div className="Joke-buttons">
        <i className="fas fa-arrow-up" onClick={upvote}></i>
        <span
          style={{
            borderColor: getColor(),
          }}
          className="Joke-votes"
        >
          {votes}
        </span>
        <i className="fas fa-arrow-down" onClick={downvote}></i>
      </div>
      <div className="Joke-text">{text}</div>
      <div className="Joke-smiley">
        <i className={getEmoji()}></i>
      </div>
    </div>
  );
};

export default Joke;
