import React from 'react'
import classes from './Seed.module.scss'

const Seed = ({value, onChange} ) => {
    const handleSeedChange = (event) => {
    const newSeed = parseInt(event.target.value);
    onChange(newSeed);
  };

  return (
    <>
<div className={classes.container}>
  <p>Seed</p>
<input type="number" step="1" value={value}
onChange={handleSeedChange}
className={classes.seedInput}
/>
</div>

    </>
  )
}
export default Seed;