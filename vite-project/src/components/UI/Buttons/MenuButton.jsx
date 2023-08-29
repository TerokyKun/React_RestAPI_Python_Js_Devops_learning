import React from 'react';
import classes from './MenuButton.module.scss';

const MenuButton = (props) => {
    return (
        <button className={classes.myBtn}>
            {props.children}
        </button>
    );
};

export default MenuButton;