import React from 'react';
import classes from './Button.module.scss'

const Button = (props) =>{
    return (
        <>
      <button className={classes.generate} onClick={props.onClick}>
      {props.children}
    </button>  
        </>
    );
}

export default Button;