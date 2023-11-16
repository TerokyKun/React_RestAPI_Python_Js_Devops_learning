import React, { useState, useRef, useEffect } from 'react';

const Negative = ({ value, onChange }) => {

  const textareaRef = useRef(null);
  const maxHeight = 250; // Change the maximum height

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }, [textareaRef, maxHeight]);

  function handleNegativeChange(event) {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    onChange(event.target.value); // Change the state setter function
  }

  return (
    <>
      <p>Negative Prompts</p>
      <textarea
        type="text"
        value={value}
        onChange={handleNegativeChange} // Change the handler function
        ref={textareaRef}
        rows={4}
      />
    </>
  );
}

export default Negative;
