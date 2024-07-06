import React from "react";
import classes from "./PostZone.module.scss";
<<<<<<< HEAD

const PostsZone = () => {
  return (
    <>
      <div className={classes.postBlock}>
        <h2 className={classes.postHeading}>
          Fresh about <span>Ai</span>
=======
const PostsZone = () => {
  return (
    <>
  
      <div className={classes.postBlock}>
        <h2 className={classes.postHeading}>
          Генерируйте изображения с <span>Ai</span>
>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)
        </h2>
        <div className={classes.imgPost}>
 <img src="/public/Ilustration_V2.jpg" alt="" />
        </div>
        <div className={classes.textPost}>
<<<<<<< HEAD
<h2 className={classes.postHeadingPost}>Ilustration V2</h2>
<p>It is another model of artistic and illustrative images with different styles</p>
<p className={classes.autorPost}>Autor</p></div>
=======
<h2 className={classes.postHeadingPost}>Stable-Diffusion</h2>
<p>Отличная технология для создания изображений с использованием нейронных сетей</p>
<p className={classes.autorPost}>Примеры изображений ниже</p></div>
>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)


        <div className="buttonZone"></div>
      </div>
    </>
  );
};

export default PostsZone;
