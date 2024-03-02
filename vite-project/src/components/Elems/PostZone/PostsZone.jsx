import React from "react";
import classes from "./PostZone.module.scss";

const PostsZone = () => {
  return (
    <>
      <div className={classes.postBlock}>
        <h2 className={classes.postHeading}>
          Fresh about <span>Ai</span>
        </h2>
        <div className={classes.imgPost}>
 <img src="/public/Ilustration_V2.jpg" alt="" />
        </div>
        <div className={classes.textPost}>
<h2 className={classes.postHeadingPost}>Ilustration V2</h2>
<p>It is another model of artistic and illustrative images with different styles</p>
<p className={classes.autorPost}>Autor</p></div>


        <div className="buttonZone"></div>
      </div>
    </>
  );
};

export default PostsZone;
