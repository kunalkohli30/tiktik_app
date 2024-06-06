'use client'

import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import Logo from '../../../utils/tiktik-logo.png';
import { createOrGetUser } from '../../../utils';
import useAuthStore from '../../../store/authStore';
import { FaExclamation } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";


const Navbar = () => {

    const { userProfile, addUser, removeUser } = useAuthStore();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const closeLogoutDialog = () => {
        setShowLogoutDialog(false);
    }

    const confirmLogout = () => {
        removeUser();
        googleLogout();
        setShowLogoutDialog(false);
    }

    return (
        <>
            <div className='absolute top-0  w-full'>
                <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4 ' id='navbar'>
                    <Link href='/' >
                        <div className='w-[100px] md:w-[130px] '>
                            <Image
                                className='cursor-pointer'
                                src={Logo}
                                alt='Tiktik'
                                layout='responsive'
                            />
                        </div>
                    </Link>
                    <div>Search</div>
                    <div>
                        {userProfile ? (
                            <div className="flex gap-5 md:gap-10 items-center">
                                <Link href='/upload'>
                                    <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                                        <IoMdAdd className='text-xl' />
                                        <span className='hidden md:block' >Upload</span>
                                    </button>
                                </Link>
                                {userProfile.image && (
                                    <Link href={'/'}>
                                        <>
                                            {/* <Image
                                                src={userProfile.image}
                                                width={62}
                                                height={62}
                                                className='rounded-full '
                                                alt='profile-photo'
                                                layout='responsive'
                                                // style={{width: '10%'}}
                                            /> */}
                                            <img
                                                src={userProfile.image}
                                                alt='profile-photo'
                                                className='w-13 h-14 rounded-full'
                                            />
                                        </>
                                    </Link>
                                )}
                                <button
                                    type='button'
                                    className='pr-2 '
                                    onClick={() => {
                                        setShowLogoutDialog(true);
                                    }}
                                >
                                    <AiOutlineLogout color='red' fontSize={40} />
                                </button>
                            </div>
                        ) : (
                            <GoogleLogin
                                onSuccess={async response => {
                                    console.log('triggering create or get request');
                                    const createorGetUserApiResponse = await createOrGetUser(response, addUser);
                                }}
                                onError={() => console.log('error')}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Logout Dialog */}
            {
                showLogoutDialog && (
                    <div>
                        <div className='absolute h-full w-full bg-black opacity-50 z-10'></div>
                        <div className='absolute flex items-center justify-center w-full h-full z-20 '>
                            <div className='flex flex-col gap-6 justify-evenly items-center w-2/5 h-2/6 p-2 bg-white
                             text-slate-600 rounded-xl opacity-120 py-6 '>

                                <div className='bg-white border-lime-500 border-4 w-20 h-20 flex items-center justify-center rounded-full'>
                                    <FaExclamation className='text-lime-500 h-10 w-4' />
                                </div>
                                <div className='text-center'>
                                    <p className='text-3xl text-slate-400'>Are you leaving?</p>
                                    <p className='text-lg  text-slate-300'>Are you sure you wanna Logout?</p>
                                </div>
                                <div className='flex w-full justify-end gap-3'>
                                    <button
                                        className='py-1 px-6 h-10 rounded-md bg-white'
                                        type='submit'
                                        onClick={closeLogoutDialog}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='py-1 px-6 border-2 border-slate-400 rounded-md bg-lime-500 mr-[-25px] shadow-2xl shadow-black'
                                        type='submit'
                                        onClick={confirmLogout}
                                    >
                                        <div className='flex items-center gap-2 text-white'>
                                            Yes <FaArrowRight />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Navbar