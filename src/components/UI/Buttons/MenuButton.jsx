import React from 'react';
import classes from './MenuButton.module.css';

const MenuButton = (props) => {
    return (
        <button className={classes.myBtn}>
            {props.children}
        </button>
    );
};

export default MenuButton;