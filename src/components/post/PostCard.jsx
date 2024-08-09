import React from 'react'
import { useDispatch } from 'react-redux'
import { addReaction } from '../../app/features/posts/postsSlice';

const PostCard = ({postData}) => {
    // console.log('Post from Card Comp', postData)

    const reactionEmojiArray = [
        { emoji: '👍', name: 'thumbsUp' },
        { emoji: '😮', name: 'wow' },
        { emoji: '❤️', name: 'heart' },
        { emoji: '🚀', name: 'rocket' },
        { emoji: '☕', name: 'coffee' }
    ];
    
    const dispatch = useDispatch();

    const handlReaction = (postId, reaction) => {
        dispatch(addReaction({postId, reaction}))
    }

  return (
    <div className='border-[1px] w-[500px] flex flex-col gap-[.7rem] p-[1rem] rounded-[.5rem]'>
        <h2 className="title text-[1.3rem] font-[500]">{postData.title}</h2>
        <p className="post__content">{postData.content}</p>
        <p className="post__owner-time flex items-center gap-[.5rem]">
            <span className="post__owner">Post by <span className='font-[500]'>{postData.userName}</span></span>
            <span className="time">{postData.date}</span>
        </p>
        <div className="reaction flex items-center gap-[1rem]">
            {reactionEmojiArray.map((reaction, index) => (
                <button onClick={() => handlReaction(postData.id, reaction.name)} key={index} className="like">{reaction.emoji}<span className="value">{postData.reactions[reaction.name]}</span></button>
            ))}
        </div>
    </div>
  )
}

export default PostCard