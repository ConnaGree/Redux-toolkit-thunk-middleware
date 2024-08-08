import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../app/features/posts/postsSlice';
import { allUsers } from '../../app/features/users/usersSlice';

const PostForm = () => {
    const users = useSelector(allUsers);
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [user, setUser] = useState(users[0].name)
    const [content, setContent] = useState('');

   

    const handleAddPost = (e) => {
        e.preventDefault()
        dispatch(addPost({'title': title, 'content': content, 'userId': user}))
        setTitle('')
        setUser('')
        setContent('')
    }

    return (
        <div className="flex max-w-[900px] justify-center text-black items-center min-h-screen">
            <div className="w-full p-8 bg-white rounded-lg border-[1px]">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add a New Post</h2>
                <form className="flex flex-col space-y-4">
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Author</label>
                        <select value={user} onChange={(e) => setUser(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            {users.map((user, index) => (
                                <option key={index}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Post Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Post content..."
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
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
