import React from 'react'
import classes from "./Steps.module.scss"

const Steps = ({value, onChange} ) => {
    const handleStepsChange = (event) => {
    let newSteps = parseInt(event.target.value);
    if (isNaN(newSteps) || newSteps < 1) {
      newSteps = 1;
    } else if (newSteps > 150){
      newSteps = 150;
    }
    onChange(newSteps);
  };

  return (
    <>
<div className={classes.container}>
  <p>Steps</p>
<input type="number" step="5" value={value}
onChange={handleStepsChange}
className={classes.stepsInput}
/>
</div>

    </>
  )
}
export default Steps;