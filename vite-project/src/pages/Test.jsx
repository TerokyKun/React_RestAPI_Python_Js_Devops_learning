import React, { useState } from 'react';
import axios from 'axios';
import classes from "./Test.module.scss"

const ArtGenerate = () => {
  const handleRunBat = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:7861/run-bat');
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={classes.artZone}>
      <button onClick={handleRunBat}>Run .bat File</button>
    </div>
  );
};

export default ArtGenerate;
