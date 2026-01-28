import { useEffect, useState, useRef } from "react";
import { languages } from "../languages";
import Hangman from "./components/Hangman";
import LanguageChip from "./components/LanguageChip";
import Status from "./components/Status";
import clsx from "clsx";
import { getFarewellText } from "../utils";
import { words } from "../words";
import Confetti from "react-confetti";
import useCountDownTimer from "./hooks/useCountDownTimer";

const App = () => {
  //Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const numGuessesLeft = languages.length - 1;
  const randomWord = words[Math.floor(Math.random() * words.length)];

  // State values
  const [currentWord, setCurrentWord] = useState(randomWord);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [showFarawell, setShowFarawell] = useState("");
  const [attempts, setAttempts] = useState(languages.length - 1);
  const { timeRemaining, isTimerActive, startTimer, stopTimer, resetTimer } =
    useCountDownTimer(60);

  //Derived values
  const wrongGuestCount = guessedLetters.filter((l) => {
    return !currentWord.includes(l);
  }).length;
  const isTimeUp = timeRemaining === 0;
  const isGameWon = currentWord
    .split("")
    .every((l) => guessedLetters.includes(l));
  const isGameLost = wrongGuestCount === languages.length - 1 || isTimeUp;
  const isGameOver = isGameWon || isGameLost;

  useEffect(() => {
    if (isGameOver) {
      stopTimer();
    }
  }, [isGameOver, stopTimer]);

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
        disabled={!isTimerActive || isGameOver}
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
    resetTimer();
    setAttempts(languages.length - 1);
  };
  return (
    <>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
      <Hangman />
      <div className="timer">Time remaining: {timeRemaining}s</div>
      <div className="remaining-attempts">
        You have <span>{attempts} </span> attempts left to try and guess the
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
        <button className="start-game" onClick={startTimer}>
          Start
        </button>
      ) : null}
    </>
  );
};

export default App;
