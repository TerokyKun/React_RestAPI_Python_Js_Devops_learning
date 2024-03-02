import React from "react";
import classes from "./AccauntAunt.module.scss";
import { useSelector } from 'react-redux';
import { nickName,  email} from "../../redux/slises/auth"

const AccauntAunt = (props) => {

  const username = useSelector(nickName);
  const mail = useSelector(email);

//   console.log(typeof username)

let firstChar = username.length === null ? null : username[0];

// console.log(firstChar)
  return (
    <>
      <div className={classes.accauntInfo}>
        <p className={classes.avatar}>{firstChar}</p>
        <div className={classes.accauntText}>
          <p>{username}</p>
        </div>
      </div>
    </>
  );
};

export default AccauntAunt;
