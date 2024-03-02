import React, { useEffect, useRef } from 'react';

const Prompt = ({ value, onChange }) => {
  const textareaRef = useRef(null);
  const maxHeight = 250; // Set the maximum height limit here

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }, [textareaRef, maxHeight]);
    
  function handleChange(event) {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    onChange(event.target.value);
  }

  return (
    <>
      <p>Prompts</p>
      <textarea
        ref={textareaRef}
        rows={4}
        onChange={handleChange}
        value={value}
      />
    </>
  );
};

export default Prompt;
