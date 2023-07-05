import React from "react";
import classes from "./MainMenu.module.css";
import MenuButton from "../UI/Buttons/MenuButton";
import AccauntAunt from "./AccauntAunt";
const MainMenu = () => {
  return (
    <>
      <div className={classes.mainMenu}>
        <h1>TerokyArt.AI</h1>
        <p className={classes.menuText}>Start here</p>
        <MenuButton>Home</MenuButton>
        <MenuButton>Community</MenuButton>
        <MenuButton>Ai Generation</MenuButton>
        <MenuButton>Settingas</MenuButton>
        <MenuButton>FAQ & Help</MenuButton>
        <MenuButton>Logout</MenuButton>
        <AccauntAunt></AccauntAunt>
      </div>
 
    </>
  );
};

export default MainMenu;
