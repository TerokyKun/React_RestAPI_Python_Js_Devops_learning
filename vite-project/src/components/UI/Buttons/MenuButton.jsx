import React from 'react';
import classes from './MenuButton.module.scss';
import Burgermenu from "../../UI/Burgermenu/Burgermenu";
const MenuButton = (props) => {
    return (
        <button className={classes.myBtn}>
            {props.children}
        </button>
    );
};

export default MenuButton;