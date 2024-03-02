import React from 'react';
import classes from './TagsBlock.module.scss';

const TagsBlock = ({ items = [], isLoading = false }) => {
  return (
    <div className={classes.tagsContainer}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={classes.tagSquare}>
          {items.map((tag, index) => (
            <div key={index} className={classes.tagWithPound}>{`#${tag}`}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsBlock;
