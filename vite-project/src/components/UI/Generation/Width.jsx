
import React, { useRef, useEffect, useState } from 'react';
import classes from "./Width.module.scss"

const Width = ({ value, onChange }) => {
  const sliderRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(360); // default width

  useEffect(() => {
    if (sliderRef.current) {
      setSliderWidth(sliderRef.current.offsetWidth);
    }
  }, [sliderRef.current]);

  const handleInputChange = (event) => {
    let newValue = parseInt(event.target.value);

    if (isNaN(newValue) || newValue < 64) {
      newValue = 64;

    } else if (newValue > 2048) {
      newValue = 2048;
    }
    onChange(newValue);
  }

  const sliderPosition = (value - 64) / (2048 - 64) * (sliderWidth - 20);


  return (
    <>
      <p>Width</p>
      <div className={classes.range}>
        <span

          style={{ left: `${sliderPosition}px` }}

          className={classes.sliderValue}
        >
          {value}
        </span>
        <div className={classes.field}>
          <input
            ref={sliderRef}
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
