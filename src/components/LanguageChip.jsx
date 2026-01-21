const LanguageChip = ({ name, backgroundColor, color }) => {
  return (
    <div
      className="language-chip"
      style={{ backgroundColor: backgroundColor, color: color }}
    >
      {name}
    </div>
  );
};

export default LanguageChip;
