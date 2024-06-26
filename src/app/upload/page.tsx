'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { SanityAssetDocument } from 'next-sanity';

import useAuthStore from '../../../store/authStore';
import { client } from '../../../utils/client';
import { topics } from '../../../utils/constants'
import axios from 'axios'

const upload = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
    const [wrongFileType, setWrongFileType] = useState(false);
    const [caption, setCaption] = useState('');
    const [category, setCategory] = useState(topics[0]?.name);
    const [savingState, setSavingState] = useState(false);

    const { userProfile }: {userProfile: any} = useAuthStore();

    const router = useRouter();

    useEffect( () => console.log(videoAsset), [videoAsset]);
    const uploadVideo = async (e: any) => {
        const selectedFile = e.target.files[0];
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];
        setWrongFileType(false);

        if (fileTypes.includes(selectedFile.type)) {
            console.log('correct file type', selectedFile.type, selectedFile.name);
            client.assets.upload('file', selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name
            }).then(data => {
                console.log('video asset uploaded', data);
                setVideoAsset(data);
                setIsLoading(false);
            }).catch(e => console.log('video asset upload error', e))
        } else {
            setIsLoading(false);
            setWrongFileType(true);
            console.log('wrong file type');
        }
    }

    const handlePost = async () => {
        if (caption && videoAsset?._id && category) {
            setSavingState(true);
            const document = {
                _type: 'post',
                caption,
                video: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: videoAsset?._id
                    }
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id
                },
                topic: category
            };

            await axios.post('http://localhost:3000/api/hello', document);
            router.push('/');
        }
    }

    return (
        <div className='flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>
            <div className="bg-white rounded-md xl:h-[80vh] w-[60%] flex flex-col md:flex-row gap-6 flex-wrap justify-between items-center p-14 ">
                <div className='w-[40%]'>
                    <div>
                        <p className='text-2xl font-bold'>Upload Video</p>
                        <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
                    </div>
                    <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center
                     outline-none mt-10  h-[560px] p-10 cursor-pointer hover:border-red-300  hover:bg-gray-100">
                        {isLoading ? (
                            <p>Uploading</p>
                        ) : (
                            <div className=''>
                                {videoAsset ? (
                                    <div>
                                        <video
                                            src={videoAsset.url}
                                            loop
                                            controls
                                            className='rounded-xl h-[450px] my-4 bg-black'
                                        >

                                        </video>
                                    </div>
                                ) : (
                                    <label className='cursor-pointer' >
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <div className='flex flex-col items-center justify-center '>
                                                <p className='font-bold text-xl'><FaCloudUploadAlt className='text-gray-300 text-6xl' /></p>
                                                <p className='text-xl font-semibold'>Upload video</p>
                                            </div>
                                            <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                                                MP4 or WebM or ogg <br />
                                                720x1280 or higher <br />
                                                Up to 10 minutes <br />
                                                Less than 2GB
                                            </p>
                                            <p className='bg-[#F51997] text-center mt-10 rounded text-white text-md font-md p-2 w-52 outline-none'>
                                                Select File
                                            </p>
                                        </div>
                                        <input
                                            type='file'
                                            name='upload-video'
                                            className='w-0 h-0'
                                            onChange={uploadVideo}
                                        />
                                    </label>
                                )}
                            </div>
                        )}
                        {wrongFileType && (
                            <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]'>
                                Please select a video file
                            </p>
                        )}
                    </div>

                </div>
                <div className='flex flex-col gap-3 pb-10 w-[40%]'>
                    <label className='text-md font-md'>Caption</label>
                    <input
                        type='text'
                        value={caption}
                        onChange={e => setCaption(e.target.value)}
                        className='rounded outline-none text-base border-2 border-gray-200 p-2'
                    />
                    <label className='text-md font-md'>Choose a category</label>
                    <select
                        onChange={e => setCategory(e.target.value)}
                        className='outline-none border-2 border-gray-200 text-base capitalize lg:p-4 p-2 rounded cursor-pointer'
                    >
                        {topics.map(topic => (
                            <option
                                key={topic.name}
                                className='outline-none capitalize bg-white text-gray-700 text-base p-2 hover:bg-slate-300'
                                value={topic.name}
                            >
                                {topic.name}
                            </option>
                        ))}
                    </select>
                    <div>
                        <div className='flex gap-6 mt-10'>
                            <button
                                onClick={() => { }}
                                type='button'
                                className='border-gray-300  border-2 text-base font-medium p-2 rounded w-28 lg:w-44 outline-none'
                            >
                                Discard
                            </button>
                            <button
                                onClick={handlePost}
                                type='button'
                                className='bg-[#F51997] text-white text-base font-medium p-2 rounded w-28 lg:w-44 outline-none'
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default upload