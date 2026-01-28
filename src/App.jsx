import { useEffect, useState, useRef } from "react";
import { languages } from "../languages";
import Hangman from "./components/Hangman";
import LanguageChip from "./components/LanguageChip";
import Status from "./components/Status";
import clsx from "clsx";
import { getFarewellText } from "../utils";
import { words } from "../words";
import Confetti from "react-confetti";

const App = () => {
  //Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const numGuessesLeft = languages.length - 1;
  const randomWord = words[Math.floor(Math.random() * words.length)];
  const timeRef = useRef(null);

  // State values
  const [currentWord, setCurrentWord] = useState(randomWord);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [showFarawell, setShowFarawell] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [attempts, setAttempts] = useState(languages.length - 1);

  //Derived values
  const isTimeUp = timeRemaining === 0;
  const wrongGuestCount = guessedLetters.filter((l) => {
    return !currentWord.includes(l);
  }).length;

  const isGameWon = currentWord
    .split("")
    .every((l) => guessedLetters.includes(l));
  const isGameLost = wrongGuestCount === languages.length - 1 || isTimeUp;
  const isGameOver = isGameWon || isGameLost;

  // time counter on component mount after clicking the start button
  useEffect(() => {
    if (!isTimerActive) return;
    timeRef.current = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timeRef.current);
  }, [isTimerActive]);

  useEffect(() => {
    if (timeRemaining <= 0 || isGameOver) {
      clearInterval(timeRef.current);
      setIsTimerActive(false);
    }
  }, [timeRemaining, isGameOver]);

  const startGame = () => {
    setTimeRemaining(60);
    setIsTimerActive(true);
  };

  const addGuessedLetter = (letter) => {
    if (!guessedLetters.includes(letter)) {
      if (!currentWord.includes(letter)) {
        const newWrongGuess = wrongGuestCount + 1;
        const farawellMessage = getFarewellText(
          languages[newWrongGuess - 1].name,
        );
        setShowFarawell(farawellMessage);
        setAttempts((prev) => prev - 1);
      }
    }
    setGuessedLetters(
      (prev) => (prev.includes(letter) ? prev : [...prev, letter]),

      // const lettersSet = new Set(prev);
      // lettersSet.add(letter);
      // return Array.from(lettersSet);
    );
  };

  const letterElements = currentWord.split("").map((el, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(el);
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(el) && "missed-letter",
      !isGameLost && guessedLetters.includes(el) && "letter",
    );

    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? el.toUpperCase() : ""}
      </span>
    );
  });

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
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const startNewGame = () => {
    setCurrentWord(randomWord);
    setGuessedLetters([]);
    setShowFarawell("");
    setIsTimerActive(false);
    setTimeRemaining(60);
    setAttempts(languages.length - 1);
  };
  return (
    <>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
      <Hangman />
      <div className="timer">Time remaining: {timeRemaining}s</div>
      <div className="remaining-attempts">
        You have <span>{attempts} </span> attempts more to try and guess the
        word
      </div>
      <Status
        isGameOver={isGameOver}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        isTimeUp={isTimeUp}
        showFarawell={showFarawell}
      />
      <section className="language-chips">{languageChips}</section>
      <section className="quessing-word">{letterElements}</section>
      <section className="sr-only" aria-live="polite" role="guessing-word">
        <p>
          Current word:
          {currentWord
            .split("")
            .map((letter) =>
              guessedLetters.includes(letter) ? letter + "." : "blank",
            )
            .join(" ")}
        </p>
        <p>You have {numGuessesLeft} attempts left.</p>
      </section>
      <section className="keyboard">{keybordLetters}</section>

      {isGameOver ? (
        <button className="new-game" onClick={startNewGame}>
          New Game
        </button>
      ) : !isTimerActive ? (
        <button className="start-game" onClick={startGame}>
          Start
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default App;
