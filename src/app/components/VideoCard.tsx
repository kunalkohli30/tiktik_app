import React, { useState, useEffect, useRef } from 'react'
import { Video } from "../../../types";
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

interface iProps {
    post: Video
}

const VideoCard: NextPage<iProps> = ({ post }) => {

    const [isHover, setIsHover] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [isVdoMuted, setIsVdoMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const onVideoPress = () => {
        if (playing) {
            videoRef?.current?.pause();
            setPlaying(false);
        } else {
            videoRef?.current?.play();
            setPlaying(true);
        }
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


    return (
        <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
            <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded items'>
                <div className='md:w-16 md:h-16 w-10 h-10'>         {/* for User profile logo */}
                    <Link href={'/'}>
                        <>
                            <Image
                                width={62}
                                height={62}
                                className='rounded-full'
                                src={post.postedBy.image}
                                alt='profile-photo'
                            />
                        </>
                    </Link>
                </div>
                <div>
                    <Link href={'/'}>
                        <div className='flex items-center gap-2'>
                            <p className='flex items-center md:text-base font-bold text-primary gap-2'>
                                {post.postedBy.userName}{` `}
                                <GoVerified className='text-blue-400 text-md' />
                            </p>
                            <p className='capitalize font-medium text-xs text-gray-500 md:block hidden'>
                                {post.postedBy.userName}
                            </p>
                        </div>
                    </Link>
                </div>
                {/* VideoCard */}
            </div>

            {/* Video div */}
            <div className='lg:ml-20 flex gap-4 relative'>  {/*  class relative hidden for adding logout confirmation msg */}
                <div
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    className='rounded-3xl'
                    onClick={() => console.log('video clicked')}
                >
                    <Link href={`/detail/${post._id}`}>
                        <video
                            ref={videoRef}
                            src={post.video?.asset?.url}
                            loop
                            className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[400px] rounded-2xl cursor-pointer bg-gray-100 z-0'
                        >

                        </video>
                    </Link>
                    {isHover && (
                        <div className='absolute bottom-6 left-8 md:left-14 lg:left-0 opacity-50 flex gap-10 lg:justify-between w-[100px] md:[50px] p-3'>
                            {
                                playing ?
                                    <button onClick={() => onVideoPress()}>
                                        <BsFillPauseFill className='text-black text-2xl lg:text-4xl' />
                                    </button>
                                    :
                                    <button onClick={() => onVideoPress()}>
                                        <BsFillPlayFill className='text-black text-2xl lg:text-4xl' />
                                    </button>
                            }
                            {
                                isVdoMuted ?
                                    <button onClick={() => onMutePress()}>
                                        <HiVolumeOff className='text-black text-2xl lg:text-4xl' />
                                    </button>
                                    :
                                    <button onClick={() => onMutePress()}>
                                        <HiVolumeUp className='text-black text-2xl lg:text-4xl' />
                                    </button>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoCard