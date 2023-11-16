import React from "react";
import classes from "./SessionBase64Gallery.module.scss";

const SessionBase64Gallery = ({ sessionList }) => {
  return (
    <div className={classes.sessionGallery}>
      {sessionList.map((session) => (
        <div key={session.id} className={classes.sessionItem}>
          <img
            src={`data:image/png;base64,${session.imageBase64}`}
            alt={`Session ${session.id}`}
            className={classes.thumbnail}
          />
          <div className={classes.sessionDetails}>
            <p>Prompt: {session.prompt}</p>
            <p>Negative Prompt: {session.negativePrompt}</p>
            <p>Width: {session.width}</p>
            <p>Height: {session.height}</p>
            <p>Seed: {session.seed}</p>
            <p>Steps: {session.steps}</p>
            <p>CFG Scale: {session.cfg_scale}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SessionBase64Gallery;
