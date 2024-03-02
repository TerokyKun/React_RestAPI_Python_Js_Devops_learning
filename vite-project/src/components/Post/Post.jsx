import React from 'react';
import classes from './Post.module.scss';

const Post = ({ id, title, imageUrl, user, createdAt, viewsCount, commentsCount, tags, isEditable }) => {
  return (
    <>
    <div className={classes.postZoneBG}>
      <div className={classes.containerPost}>
        <p className={classes.title}>{title}</p>
        <p className={classes.content}>Created by: {user ? user.nickName : 'null'}</p>
        <p className={classes.content}>Created at: {createdAt}</p>
        <p className={classes.content}>Views: {viewsCount}</p>
        <p className={classes.content}>Comments: {commentsCount}</p>
        <p className={classes.content}>Tags: {tags.join(', ')}</p>
        {isEditable && <p className={classes.editable}>Editable</p>}
      </div>
      </div>
    </>
  );
};

export default Post;
