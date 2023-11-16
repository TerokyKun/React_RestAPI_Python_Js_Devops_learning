import React from 'react'
import classes from "./CFGscale.module.scss"

const CFGscale = ({value, onChange} ) => {
    const handleStepsChange = (event) => {
    let newCFGscale = parseFloat(event.target.value);

    if (isNaN(newCFGscale) || newCFGscale < 1) {
      newCFGscale = 1;
    } else if (newCFGscale > 30){
      newCFGscale = 30;
    }
    onChange(newCFGscale);
  };

  return (
    <>
<div className={classes.container}>
  <p>CFG Scale</p>
<input type="number"
step="0.5"
value={value}
onChange={handleStepsChange}
className={classes.CFGscaleInput}
/>
</div>

    </>
  )
}
export default CFGscale;