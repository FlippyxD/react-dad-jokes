import React, { useState, useEffect } from "react";
import Joke from "./Joke";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import "./Jokelist.css";

const Jokelist = () => {
  //Control variables
  const numJokesToGet = 10;
  const url = "https://icanhazdadjoke.com/";
  const savedJokes = JSON.parse(window.localStorage.getItem("jokes"));

  //If there are jokes inside the local storage, get them, otherwise set it to empty string
  const [jokes, setJokes] = useState(savedJokes || []);
  const [loading, setLoading] = useState(false);

  //Set of unique jokes
  let seenJokes = new Set(jokes.map((joke) => joke.text));

  //ComponentDidMount functionality
  useEffect(() => {
    //If there are no jokes fetched, fetch 10
    if (jokes.length === 0) getJokes();
  }, []);

  //Rerenders after each change of loader
  useEffect(() => {
    if (loading) getJokes();
  }, [loading]);

  //After each change of jokes, stores the current state to local storage
  useEffect(() => {
    window.localStorage.setItem("jokes", JSON.stringify(jokes));
  }, [jokes]);

  //Fetch unique jokes
  const getJokes = async () => {
    try {
      let fetchedJokes = [];

      //Makes request till we fetch 10 unique jokes
      while (fetchedJokes.length < numJokesToGet) {
        let res = await axios.get(url, {
          headers: {
            Accept: "application/json",
          },
        });

        let newJoke = res.data.joke;

        //Check if juke is not already in a list
        if (!seenJokes.has(newJoke)) {
          fetchedJokes.push({ id: uuidv4(), text: newJoke, votes: 0 });
        } else {
          console.log("DUPLICATE!!!");
          console.log(newJoke);
        }
      }

      setJokes([...jokes, ...fetchedJokes]);
      setLoading(false);
    } catch (e) {
      alert(e);
      setLoading(false);
    }
  };

  //Manipulate "likes" counter
  const handleVote = (id, delta) => {
    const votedJokes = [...jokes].map((joke) =>
      joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
    );
    setJokes(votedJokes.sort((a, b) => b.votes - a.votes));
  };

  //Fetches 10 new unique jokes
  const handleClick = () => {
    setLoading(true);
  };

  //During API request shows loader
  if (loading) {
    return (
      <div className="Jokelist-spinner">
        <i className="far fa-8x fa-laugh fa-spin" />
        <h1 className="Jokelist-title">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="Jokelist">
      <div className="Jokelist-sidebar">
        <h1 className="Jokelist-title">
          <span>Dad</span> Jokes
        </h1>
        <img
          src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
          alt="smiling-emoticon"
        />
        <button className="Jokelist-getmore" onClick={handleClick}>
          Fetch Jokes
        </button>
      </div>

      <div className="JokeList-jokes">
        {jokes.map((joke) => (
          <Joke
            key={joke.id}
            votes={joke.votes}
            text={joke.text}
            upvote={() => handleVote(joke.id, 1)}
            downvote={() => handleVote(joke.id, -1)}
          />
        ))}
      </div>
    </div>
  );
};

export default Jokelist;
