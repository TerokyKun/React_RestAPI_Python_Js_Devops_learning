import React from "react";
import classes from "./MainMenu.module.scss";
import { Link, Outlet } from "react-router-dom";
import AccauntAunt from "./AccauntAunt";
import MenuButton from "../UI/Buttons/MenuButton";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slises/posts";
import { logout } from "../../redux/slises/auth"
const MainMenu = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const onClickLogout = () => {
    if (window.confirm('Вы уверены, что хотите выйти?')){
      dispatch(logout()); // Вызов действия logout при нажатии кнопки "Logout"
      // Clear the token cookie
      document.cookie = 'access_token=; Max-Age=0; path=/';
    }
  };
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
        {/* <Link to="/settings">
          <MenuButton>Settings</MenuButton>
        </Link>
        <Link to="/help">
          <MenuButton>FAQ & Help</MenuButton>
        </Link> */}
       {isAuth ? (
          <Link to="/" onClick={onClickLogout}>
            <MenuButton>Logout</MenuButton>
          </Link>
        ) : (
          <Link to="/auth/login">
            <MenuButton>Login</MenuButton>
          </Link>
        )}
        {/* <Link to="/test">
          <MenuButton>Test Node</MenuButton>
        </Link> */}
 {isAuth ? (        
<Link to="user">
<AccauntAunt></AccauntAunt>
</Link>
 ) : (
<div></div>
 )}
      </div>
      <Outlet />
    </>
  );
};

export default MainMenu;
