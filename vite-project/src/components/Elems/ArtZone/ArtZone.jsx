import React from "react";
import classes from "./ArtZone.module.scss";
import data from '../../../../public/dataBaseArtForTest.json';

const ArtZone = () => {
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




export default ArtZone;