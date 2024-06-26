import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { GoVerified } from 'react-icons/go';
import useAuthStore from '../../../store/authStore';
import { IUser } from '../../../types';

const SuggestedAccounts = () => {

  const { fetchAllUsers, allUsers, userProfile } = useAuthStore();

  useEffect(() => { fetchAllUsers() }, []);
  useEffect(() => { console.log('allUsers', allUsers) }, [allUsers]);

  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>Suggested Accounts</p>
      <div>
        {allUsers && allUsers.length && allUsers.map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
              skj,
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts