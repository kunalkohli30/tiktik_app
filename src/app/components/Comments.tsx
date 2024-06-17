import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../../../store/authStore';
import NoResults from './NoResults';

interface iProps {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  addComment: () => Promise<void>;
  isPostingComment: boolean;
  allComments: iComment[];
}

interface iComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string, _id?: string };
}

const Comments = ({ comment, setComment, addComment, isPostingComment, allComments }: iProps) => {

  const { userProfile } = useAuthStore();
  const [commentText, setCommentText] = useState('');
  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 pb-[100px] lg:pb-0'>
      <div className="overflow-hidden lg:h-[475px]">
        {allComments && allComments.length ? (
          <div>Videos</div>
        ) : (
          <NoResults text='No comments yet!' />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-9 pb-6 px-2 md:px-10">
          <form
            className='flex gap-4'
            onSubmit={() => {
              setComment(commentText);
              addComment();
            }}
          >
            <input
              value={commentText}
              onChange={e => setCommentText(e.target.value.trim())}
              placeholder='Add Comment'
              className='bg-primary px-6 py-4 text-base font-medium border-2 
              w-[250px] lg:w-[400px] border-gray-100 focus:outline-none focus:border-gray-300
              flex-1 rounded-lg'
            />
            <button
              className='text-base text-gray-400'
              onClick={e => {
                e.preventDefault();
                addComment();
              }}
            >
              {isPostingComment ? 'Commenting....' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments