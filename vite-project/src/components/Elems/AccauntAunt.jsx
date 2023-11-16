import React from "react";
import classes from "./AccauntAunt.module.scss";
const AccauntAunt = () => {
  return (
    <>
      <div className={classes.accauntInfo}>
        <p className={classes.avatar}>T</p>
        <div className={classes.accauntText}>
          <p>TerokyKun</p>
          <p>ivanivanov@mail.ru</p>
        </div>
      </div>
    </>
  );
};

export default AccauntAunt;
