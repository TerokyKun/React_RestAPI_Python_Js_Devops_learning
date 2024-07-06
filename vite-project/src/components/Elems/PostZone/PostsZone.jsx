import React from "react";
import classes from "./PostZone.module.scss";

const PostsZone = () => {
  return (
    <>
  
      <div className={classes.postBlock}>
        <h2 className={classes.postHeading}>
          Генерируйте изображения с <span>Ai</span>
        </h2>
        <div className={classes.imgPost}>
 <img src="/public/Ilustration_V2.jpg" alt="" />
        </div>
        <div className={classes.textPost}>
<h2 className={classes.postHeadingPost}>Stable-Diffusion</h2>
<p>Отличная технология для создания изображений с использованием нейронных сетей</p>
<p className={classes.autorPost}>Примеры изображений ниже</p></div>


        <div className="buttonZone"></div>
      </div>
    </>
  );
};

export default PostsZone;
