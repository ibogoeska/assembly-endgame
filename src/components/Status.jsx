const Status = ({
  isGameOver,
  isGameLost,
  isGameWon,
  isTimeUp,
  showFarawell,
}) => {
  return (
    <section className="game-status" aria-live="polite" role="status">
      {/* WIN */}
      {isGameWon && (
        <div className="game-won">
          <h2>You win!</h2>
          <p>Well done!</p>
        </div>
      )}

      {/* LOSS BY TIME */}
      {!isGameWon && isGameLost && isTimeUp && (
        <div className="game-lost">
          <h2>Time’s up!</h2>
          <p>You ran out of time.</p>
        </div>
      )}

      {/* LOSS BY WRONG GUESSES */}
      {!isGameWon && isGameLost && !isTimeUp && (
        <div className="game-lost">
          <h2>Game over!</h2>
          <p>Better start learning Assembly!</p>
        </div>
      )}

      {/* MID-GAME FAREWELL */}
      {!isGameOver && showFarawell && (
        <p className="farawell-msg">"{showFarawell}"</p>
      )}
    </section>
  );
};

export default Status;
