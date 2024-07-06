import React from 'react';
import classes from './MenuButton.module.scss';
<<<<<<< HEAD

=======
import Burgermenu from "../../UI/Burgermenu/Burgermenu";
>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)
const MenuButton = (props) => {
    return (
        <button className={classes.myBtn}>
            {props.children}
        </button>
    );
};

export default MenuButton;