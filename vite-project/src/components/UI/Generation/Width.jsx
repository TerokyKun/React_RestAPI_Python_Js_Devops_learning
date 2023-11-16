import React from 'react';
import classes from "./Width.module.scss"


const Width = ({ value, onChange }) => {

  const handleInputChange = (event) => {
    let newValue = parseInt(event.target.value);

    if (isNaN(newValue) || newValue < 64) {
      newValue = 64;
    } else if (newValue > 2048){
      newValue = 2048;
    }
    onChange(newValue)
  }
  return (
    <>
      <p>Width</p>
      <div className={classes.range}>
        <span
          style={{ left: `${(value) / 2048 * 90}%` }}
          className={classes.sliderValue}
        >
          {value}
        </span>
        <div className={classes.field}>
          <input
            type="range"
            min="64"
            max="2048"
            value={value}
            step="64"
            onChange={handleInputChange}
          />
        </div>
        <input
        type="number"
        min="64"
        max="2048"
        value={value}
        step="64"
        
        onChange={handleInputChange}
        className={classes.valuesWidth}
      />
      </div>
      
    </>
  );
}

export default Width;
