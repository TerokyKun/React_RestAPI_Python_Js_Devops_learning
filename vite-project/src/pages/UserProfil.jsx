import React from "react";
import classes from "./UserProfil.module.scss";
import data from '../../public/dataBaseArtForTest.json';
import { useSelector } from "react-redux";  
import { selectIsAuth } from "../redux/slises/auth";

const UserProfil = () => {
    const isAuth = useSelector(selectIsAuth);
  return (

<>
   
  <div className={classes.gallery}>
      {data.map((item) => (
        <img className={classes.art} key={item.id} src={item.image} alt={`Image ${item.id}`} />
      ))}
    </div>
  
   
  

</>
  );
};




export default UserProfil;