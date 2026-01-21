import { useState } from "react";
import { languages } from "../languages";
import Hangman from "./components/Hangman";
import LanguageChip from "./components/LanguageChip";
import Status from "./components/Status";

const App = () => {
  const [currentWord, setCurrentWord] = useState("React");

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const keybordLetters = alphabet.split("").map((letter) => (
    <button className="keyboard-letter" key={letter}>
      {letter.toUpperCase()}
    </button>
  ));

  const letterElements = currentWord.split("").map((el, index) => (
    <span key={index} className="letter">
      {el.toUpperCase()}
    </span>
  ));

  const languageChips = languages.map((l) => (
    <LanguageChip
      key={l.name}
      name={l.name}
      backgroundColor={l.backgroundColor}
      color={l.color}
    />
  ));
  return (
    <>
      <Hangman />
      <Status />
      <section className="language-chips">{languageChips}</section>
      <section className="quessing-word">{letterElements}</section>
      <section className="keybord">{keybordLetters}</section>
      <button className="new-game">New Game</button>
    </>
  );
};

export default App;
