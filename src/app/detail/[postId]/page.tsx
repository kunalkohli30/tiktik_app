'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';
import { BASE_URL } from '../../../../utils';
import { Video } from '../../../../types';
import useAuthStore from '../../../../store/authStore';
import Comments from '@/app/components/Comments';
import LikeButton from '@/app/components/LikeButton';

const page = ({ params }: { params: { postId: string } }) => {

  const [postDetails, setPostDetails] = useState<Video | null>(null);
  const [playing, setPlaying] = useState(false);
  const [isVdoMuted, setIsVdoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const { userProfile }: { userProfile: any } = useAuthStore();

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  }

  useEffect(() => {
    fetchPostDetails();
  }, [])

  const fetchPostDetails = () => {
    axios.get(`${BASE_URL}/api/post/${params.postId}`)
      .then(response => {

        // console.log('get post details api response', response);
        if (response.status !== 200) {
          throw new Error('Failed to fetch data');
        } else {
          setPostDetails(response.data);
        }
      });
  }

  const onMutePress = () => {
    if (videoRef?.current) {
      if (isVdoMuted) {
        videoRef.current.muted = false;
        setIsVdoMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsVdoMuted(true);
      }
    }
  }

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const response = await axios.put(`http://localhost:3000/api/like`, {
        userId: userProfile._id,
        postId: postDetails?._id,
        like: like
      })

      if (response.status === 200) {
        // console.log(response.data);
        console.log('likes ', response.data.likes);
      }
      postDetails && setPostDetails({ ...postDetails, likes: response.data.likes })

    }
  }

  if (!postDetails) return null;
  return (

    <div className='w-[100vw] h-[100vh] z-50 flex overflow-hidden'>
      {/* <div className='flex h-1/2 w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'> */}
      <div className='flex h-[90%] w-full  bg-white flex-wrap lg:flex-nowrap'>
        <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black'>
          <div className='absolute top-6 left-2 xl:left-6 flex gap-6 z-50'>
            <p className='cursor-pointer' onClick={() => router.back()}>
              <MdOutlineCancel className='text-white text-[35px]' />
            </p>
          </div>
          <div className='relative'>
            <div className='h-[60vh] lg:h-[100vh]'>
              <video
                src={postDetails.video.asset.url}
                className='h-full cursor-pointer'
                ref={videoRef}
                loop
                onClick={onVideoClick}
              ></video>
            </div>
            <div className='absolute top-[45%] left-[45%] cursor-pointer'>
              {!playing && (
                <button onClick={onVideoClick}>
                  <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
                </button>
              )}
            </div>
          </div>

          <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
            {
              isVdoMuted ?
                <button onClick={() => onMutePress()}>
                  <HiVolumeOff className='text-white text-2xl lg:text-4xl' />
                </button>
                :
                <button onClick={() => onMutePress()}>
                  <HiVolumeUp className='text-white text-2xl lg:text-4xl' />
                </button>
            }
          </div>
        </div>

        {/* right side of screen */}
        <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
          <div className='mt-10 lg:mt-20'>

            <div className='flex gap-2 p-12 m-auto'>
              <Link href='/' className='cursor-pointer'>
                <Image
                  width={62}
                  height={62}
                  className='rounded-full'
                  src={postDetails?.postedBy?.image}
                  alt='profile-photo'
                />
              </Link>
              <div className='flex p-2 justify-between  flex-col'>
                <p className='font-bold capitalize text-lg flex gap-2'>
                  {postDetails?.postedBy?.userName}
                  <GoVerified className='bg-blue-400 text-white rounded-full outline-none text-base ' />
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 md:block hidden mt-1'>
                  {postDetails.postedBy.userName}
                </p>
                {/* <p>{postDetails?.caption}</p> */}
              </div>
            </div>

            <p className='text-lg text-gray-600 px-12 font-serif'>{postDetails?.caption}</p>
            <div className='px-12 mt-10'>
              {userProfile && (
                <LikeButton handleLike={handleLike} likes={postDetails?.likes} />
              )}
            </div>
            <Comments />

          </div>

        </div>
      </div>
    </div>
  )
}

export default page