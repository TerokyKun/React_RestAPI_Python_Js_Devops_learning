import React, { useState, useRef, useEffect } from "react";
import classes from "./Burgermenu.module.scss";
import { Link, Outlet } from "react-router-dom";
import AccauntAunt from "../../Elems/AccauntAunt";
import MenuButton from "../../UI/Buttons/MenuButton";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../../redux/slises/posts";
import { logout } from "../../../redux/slises/auth";
import menuBtnIcon from "../../../assets/menu-btn.png";

const Burgermenu = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const menuRef = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onClickMenuButton = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onClickLogout = () => {
    if (window.confirm("Вы уверены, что хотите выйти?")) {
      dispatch(logout());
      document.cookie = "access_token=; Max-Age=0; path=/";
    }
  };

  return (
    <>
      <div className={classes.mainMenu}>
        <div className={classes.menuBtn} onClick={onClickMenuButton}>
          <img src={menuBtnIcon} alt="Menu Icon" ref={menuRef}/>
          <Link to="/" className={classes.titleLink}>
            <h1>Art.AI</h1>
          </Link>
        </div>
        <div className={`${isMenuOpen ? classes.listBtn : classes.hidden}`}>
          <Link to="/">
            <MenuButton>Home</MenuButton>
          </Link>
          <Link to="/community">
            <MenuButton>Community</MenuButton>
          </Link>
          <Link to="/generate">
            <MenuButton>Ai Generation</MenuButton>
          </Link>
          {isAuth ? (
            <Link to="/" onClick={onClickLogout}>
              <MenuButton>Logout</MenuButton>
            </Link>
          ) : (
            <Link to="/auth/login">
              <MenuButton>Login</MenuButton>
            </Link>
          )}
          {isAuth ? (
            <Link to="user">
              <AccauntAunt></AccauntAunt>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Burgermenu;
