import React from "react";

const Height = ({ value, onChange }) => {
  const handleHeightChange = (event) => {
    const newHeight = parseInt(event.target.value);
    onChange(newHeight);
  };

  return (
    <>
      <p>height</p>
      <input
        type="range"
        min="64"
        max="2048"
        value={value}
        step="64"
        onChange={handleHeightChange}
      />
      <input
        type="number"
        min="64"
        max="2048"
        value={value}
        onChange={handleHeightChange}
      />
    </>
  );
};

export default Height;
