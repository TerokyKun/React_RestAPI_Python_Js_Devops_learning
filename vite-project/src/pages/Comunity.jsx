import React from 'react';
import classes from './Comunity.module.scss';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../redux/slises/posts';
import Post from '../components/Post/Post';
import TagsBlock from '../components/Tags/TagsBlock';
<<<<<<< HEAD
=======
import Burgermenu from '../components/UI/Burgermenu/Burgermenu';
>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)

const Comunity = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector(state => state.posts);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  // console.log(posts);

  const fakePosts = [
    {
      id: 1,
      title: 'Roast the code #1 | Rock Paper Scissors',
      text: 'Aboba',
      imageUrl:
        'https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png',
      user: {
        avatarUrl:
          'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
        fullName: 'Keff',
      },
      createdAt: '12 июня 2022 г.',
      viewsCount: 150,
      commentsCount: 3,
      tags: ['react', 'fun', 'typescript'],
      isEditable: true,
    },
  ];
  const fakeTags = ['react', 'typescript', 'заметки'];


  const sortedPosts = [...(isPostsLoading ? fakePosts : posts.items)].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  return (
    <>
      <div className={classes.postZoneBG}>
<<<<<<< HEAD
=======
      <Burgermenu />
>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)
        <div className={classes.postZone}>
          <h2 className={classes.heading}>Here are posts from the community</h2>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          {sortedPosts.map((post, index) => (
            <Post
              key={post.id || index}
              id={post.id}
              title={post.title}
              text={post.text}
              imageUrl={post.imageUrl}
              user={post.user}
              createdAt={post.createdAt}
              viewsCount={post.viewsCount}
              commentsCount={post.commentsCount}
              tags={post.tags}
              isEditable={post.isEditable}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Comunity;
