import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from './PostCard';
import { allPosts, getPostError, getPostStatus, fetchPosts } from '../../app/features/posts/postsSlice';
import Spinner from '../Spinner';

const PostsContainer = () => {
  const dispatch = useDispatch();
  
  // Use useSelector to get values
  const posts = useSelector(allPosts);
  const error = useSelector(getPostError);
  const status = useSelector(getPostStatus);
  
  let content;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    content = <Spinner />;
  } else if (status === 'succeeded') {
    content = posts.map((post) => (
      <PostCard key={post.id} postData={post} />
    ));
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div className='flex flex-wrap gap-[1rem] max-w-[1200px]'>
      {content}
    </div>
  );
};

export default PostsContainer;
