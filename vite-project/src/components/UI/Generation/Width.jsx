<<<<<<< HEAD
import React from 'react';
import classes from "./Width.module.scss"


const Width = ({ value, onChange }) => {
=======
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
>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)

  const handleInputChange = (event) => {
    let newValue = parseInt(event.target.value);

    if (isNaN(newValue) || newValue < 64) {
      newValue = 64;
<<<<<<< HEAD
    } else if (newValue > 2048){
      newValue = 2048;
    }
    onChange(newValue)
  }
=======
    } else if (newValue > 2048) {
      newValue = 2048;
    }
    onChange(newValue);
  }

  const sliderPosition = (value - 64) / (2048 - 64) * (sliderWidth - 20);

>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)
  return (
    <>
      <p>Width</p>
      <div className={classes.range}>
        <span
<<<<<<< HEAD
          style={{ left: `${(value) / 2048 * 90}%` }}
=======
          style={{ left: `${sliderPosition}px` }}
>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)
          className={classes.sliderValue}
        >
          {value}
        </span>
        <div className={classes.field}>
          <input
<<<<<<< HEAD
=======
            ref={sliderRef}
>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)
            type="range"
            min="64"
            max="2048"
            value={value}
            step="64"
            onChange={handleInputChange}
          />
        </div>
        <input
<<<<<<< HEAD
        type="number"
        min="64"
        max="2048"
        value={value}
        step="64"
        
        onChange={handleInputChange}
        className={classes.valuesWidth}
      />
      </div>
      
=======
          type="number"
          min="64"
          max="2048"
          value={value}
          step="64"
          onChange={handleInputChange}
          className={classes.valuesWidth}
        />
      </div>
>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)
    </>
  );
}

export default Width;
