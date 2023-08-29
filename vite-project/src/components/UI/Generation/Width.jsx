import React from 'react';

const Width = ({ value, onChange }) => {
  const handleWidthChange = (event) => {
    const newWidth = parseInt(event.target.value);
    onChange(newWidth);
  };

  return (
    <>
      <p>width</p>
      <input
        type="range"
        min="64"
        max="2048"
        value={value}
        step="64"
        onChange={handleWidthChange}
      />
      <input
        type="number"
        min="64"
        max="2048"
        value={value}
        onChange={handleWidthChange}
      />
    </>
  );
}

export default Width;
