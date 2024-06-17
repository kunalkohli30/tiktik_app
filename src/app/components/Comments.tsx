import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../../../store/authStore';
import NoResults from './NoResults';

const Comments = () => {

  const comments = [];

  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 pb-[100px] lg:pb-0'>
      <div className="overflow-hidden lg:h-[475px]">
        {comments.length ? (
          <div>Videos</div>
        ) : (
          <NoResults text='No comments yet!' />
        )}
      </div>
    </div>
  )
}

export default Comments