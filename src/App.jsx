import { useState } from "react";
import { languages } from "../languages";
import Hangman from "./components/Hangman";
import LanguageChip from "./components/LanguageChip";
import Status from "./components/Status";
import clsx from "clsx";

const App = () => {
  //Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  // State values
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  //Derived values
  const wrongGuestCount = guessedLetters.filter((l) => {
    return !currentWord.includes(l);
  }).length;
  const isGameWon = currentWord
    .split("")
    .every((l) => guessedLetters.includes(l));
  const isGameLost = wrongGuestCount === languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  const addGuessedLetter = (letter) => {
    setGuessedLetters(
      (prev) => (prev.includes(letter) ? prev : [...prev, letter]),

      // const lettersSet = new Set(prev);
      // lettersSet.add(letter);
      // return Array.from(lettersSet);
    );
  };

  const letterElements = currentWord.split("").map((el, index) => (
    <span key={index} className="letter">
      {guessedLetters.includes(el) ? el.toUpperCase() : ""}
    </span>
  ));

  const languageChips = languages.map((l, index) => (
    <LanguageChip
      key={l.name}
      name={l.name}
      backgroundColor={l.backgroundColor}
      color={l.color}
      isLost={index < wrongGuestCount}
    />
  ));

  const keybordLetters = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.toLowerCase().includes(letter);
    const isWrong = isGuessed && !currentWord.toLowerCase().includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={className}
        key={letter}
        value={letter}
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  return (
    <>
      <Hangman />
      <Status
        isGameOver={isGameOver}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
      />
      <section className="language-chips">{languageChips}</section>
      <section className="quessing-word">{letterElements}</section>
      <section className="keyboard">{keybordLetters}</section>
      {isGameOver && <button className="new-game">New Game</button>}
    </>
  );
};

export default App;
