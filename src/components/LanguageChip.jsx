const LanguageChip = ({ name, backgroundColor, color, isLost }) => {
  return (
    <div
      className={`language-chip ${isLost ? "lost" : ""}`}
      style={{ backgroundColor: backgroundColor, color: color }}
    >
      {name}
    </div>
  );
};

export default LanguageChip;
