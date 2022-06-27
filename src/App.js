import React, { useEffect, useState } from "react";
import { words } from "./words";
import "./App.css";
import styled from "styled-components";

const WORD_LENGTH = 5;
function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => {});
  useEffect(() => {
    console.log(words.length);
    if (words.length > 0) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setSolution(randomWord);
    } else {
      setSolution("empty");
    }
  }, []);
  useEffect(() => {
    const handleType = event => {
      if (event.key === "Enter") {
        if (currentGuess.length !== 5) {
          setMsg("enter word with 5 letter length");
          return;
        }
        let isValidLetter = words.includes(currentGuess);

        if (currentGuess.length === 5 && !isValidLetter) {
          setCurrentGuess("");
          setMsg("enter valid letter");
          return;
        }

        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex(val => val == null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");
        const isCorrect = solution === currentGuess;

        if (isCorrect) {
          setGameOver(true);
          setMsg("you win");
        }
      }
      if (currentGuess.length >= 5) {
        return;
      }
      if (event.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }
      const isLetter = event.key.match(/^[a-z]{1}$/) != null;
      if (isLetter) {
        setCurrentGuess(oldGuess => oldGuess + event.key);
      }
      console.log(guesses);
      if (guesses[5] !== null) {
        setMsg(`gameOver!! you suck the word was ${solution}`);
      }
    };
    if (!gameOver) {
      window.addEventListener("keydown", handleType);
    }
    return () => window.removeEventListener("keydown", handleType);
  }, [currentGuess, gameOver, solution, guesses]);
  return (
    <div className='board'>
      {guesses.map((guess, i) => {
        const isCurrentGuess = i === guesses.findIndex(val => val == null);
        return (
          <Line
            guess={isCurrentGuess ? currentGuess : guess || ""}
            isFinal={!isCurrentGuess && guess != null}
            solution={solution}
          />
        );
      })}
      {msg}
    </div>
  );
}

const Line = ({ guess, isFinal, solution }) => {
  const tiles = [];
  console.log(solution);
  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i];
    let className = "tile";
    if (isFinal) {
      if (char === solution[i]) {
        className += " correct";
      } else if (solution.includes(char)) {
        className += " close";
      } else {
        className += " incorrect";
      }
    }
    tiles.push(
      <div key={i} className={className}>
        {char}
      </div>
    );
  }

  return <div className='line'>{tiles}</div>;
};

export default App;
