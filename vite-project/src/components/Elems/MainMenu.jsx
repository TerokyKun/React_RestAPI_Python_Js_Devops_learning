import React from "react";
import classes from "./MainMenu.module.scss";
import { Link, Outlet } from "react-router-dom";
import AccauntAunt from "./AccauntAunt";
import MenuButton from "../UI/Buttons/MenuButton";

const MainMenu = () => {
  return (
    <>
      <div className={classes.mainMenu}>
        <h1>TerokyArt.AI</h1>
        <p className={classes.menuText}>Start here</p>
        <Link to="/">
          <MenuButton>Home</MenuButton>
        </Link>
        <Link to="/community">
          <MenuButton>Community</MenuButton>
        </Link>
        <Link to="/generate">
          <MenuButton>Ai Generation</MenuButton>
        </Link>
        <Link to="/settings">
          <MenuButton>Settings</MenuButton>
        </Link>
        <Link to="/help">
          <MenuButton>FAQ & Help</MenuButton>
        </Link>
        <Link to="/auth/login">
          <MenuButton>Logout</MenuButton>
        </Link>
        <Link to="/test">
          <MenuButton>Test Node</MenuButton>
        </Link>

        <AccauntAunt></AccauntAunt>
      </div>
      <Outlet />
    </>
  );
};

export default MainMenu;
