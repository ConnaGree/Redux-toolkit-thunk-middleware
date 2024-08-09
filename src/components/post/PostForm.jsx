import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../app/features/posts/postsSlice';
import { allUsers, fetchUsers } from '../../app/features/users/usersSlice';

const PostForm = () => {
    const dispatch = useDispatch();
    const users = useSelector(allUsers);

    // State variables for form inputs
    const [title, setTitle] = useState('');
    const [user, setUser] = useState('');
    const [content, setContent] = useState('');

    // Fetch users when the component mounts
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    // Set the first user as the default selected user when users are loaded
    useEffect(() => {
        if (users.length > 0) {
            setUser(users[0].name);
        }
    }, [users]);

    // Handler to add a new post
    const handleAddPost = (e) => {
        e.preventDefault();
        // Dispatch the addPost action with the form data
        dispatch(addPost({ title, content, userName: user }));
        // Clear form inputs
        setTitle('');
        setUser('');
        setContent('');
    };

    return (
        <div className="flex text-black">
            <div className="p-8 bg-white rounded-lg border-[1px]">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add a New Post</h2>
                <form className="flex w-full flex-col space-y-4">
                    {/* Title Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Post Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="Post title..."
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/* Author Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Author</label>
                        <select
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            {users.map((user) => (
                                <option key={user.id} value={user.name}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    {/* Content Textarea */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Post Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Post content..."
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        onClick={handleAddPost}
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostForm;
