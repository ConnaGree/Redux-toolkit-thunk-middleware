import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import {
  allPosts,
  getPostError,
  getPostStatus,
  fetchPosts,
} from "../../app/features/posts/postsSlice";
import Spinner from "../Spinner";

const PostsContainer = () => {
  const dispatch = useDispatch();

  // Use useSelector to retrieve posts, error, and status from the Redux store
  const posts = useSelector(allPosts);
  const error = useSelector(getPostError);
  const status = useSelector(getPostStatus);

  let content;

  // Fetch posts on initial render if the status is 'idle'
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  // Determine the content to render based on the status of the fetch operation
  if (status === "loading") {
    // Show a spinner while the posts are loading
    content = <Spinner />;
  } else if (status === "succeeded") {
    // Map through the posts and render a PostCard for each one
    content = posts.map((post) => <PostCard key={post.id} postData={post} />);
  } else if (status === "failed") {
    // Display an error message if the fetch operation failed
    content = <p>{error}</p>;
  }

  return (
    <div className="flex flex-wrap gap-[1rem] max-w-[1200px]">
      {content}
    </div>
  );
};

export default PostsContainer;
