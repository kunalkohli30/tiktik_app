import React, { useEffect, useState } from 'react'
import { MdFavorite } from 'react-icons/md';
import useAuthStore from '../../../store/authStore';

type props = {
    handleLike: (isLiked: boolean) => void,
    likes: any[]
}

const LikeButton = ({ handleLike, likes }: props) => {

    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const { userProfile }: any = useAuthStore();

    useEffect(() => {
        const filterLikes = likes && likes.filter(likeObj => likeObj?._ref === userProfile?._id);
        if (filterLikes && filterLikes.length)
            setAlreadyLiked(true);
        else
            setAlreadyLiked(false);
    }, [likes]);


    return (
        <div className='gap-6'>
            <div className='mt-4 flex items-start flex-col  cursor-pointer'>
                {
                    alreadyLiked ? (
                        <div className='bg-primary rounded-full p-2 md:p-4 text-[#F51997]' onClick={() => handleLike(false)}>
                            <MdFavorite className='text-lg md:text-2xl]' />
                        </div>
                    ) : (
                        <div className='bg-primary rounded-full p-2 md:p-4 ' onClick={() => handleLike(true)}>
                            <MdFavorite className='text-lg md:text-2xl]' />
                        </div>
                    )
                }
                <p className='text-xl font-semibold pl-5 '>{likes?.length | 0}</p>
            </div>
        </div>
    )
}

export default LikeButton