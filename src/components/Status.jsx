const Status = ({ isGameOver, isGameLost, isGameWon }) => {
  return (
    <section className="game-status">
      {isGameOver && isGameWon && (
        <div className="game-won">
          <h2>You win! </h2>
          <p>Well done!</p>
        </div>
      )}
      {isGameOver && isGameLost && (
        <div className="game-lost">
          <h2>Game over!</h2>
          <p>You might better start learning Assembly!</p>
        </div>
      )}
    </section>
  );
};

export default Status;
