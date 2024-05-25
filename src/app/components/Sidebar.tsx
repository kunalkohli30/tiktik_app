"use client";

import React, { useState } from 'react'
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GoogleLogin } from '@react-oauth/google';

import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { error, log } from 'console';

import { useGoogleLogin } from '@react-oauth/google';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';


const Sidebar = () => {

    const normalLink = 'flex justify-center items-center p-3 hover:bg-primary gap-3 xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded-xl';
    const [showSidebar, setShowSidebar] = useState(true);
    const userProfile = false;

    const login = useGoogleLogin({
        onSuccess: codeResponse => console.log(codeResponse)
    });

    return (
        <div>
            <div className="block xl:hidden m-2 ml-4 mt-3 text-lg">
                <button onClick={() => setShowSidebar((prevState) => !prevState)}>
                    {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
                </button>
            </div>

            {showSidebar && (
                <div className='xl:w-400 w-20 flex flex-col border-r-2 border-gray-100 xl:border-0 p-3 mb-10'>
                    <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
                        <Link href='/'>
                            <div className={normalLink}>
                                <p className='text-2xl'><AiFillHome /></p>
                                <span className='hidden xl:block'>For you</span>
                            </div>
                        </Link>
                    </div>
                    {!userProfile && (
                        <div className='hidden xl:block py-4 px-2'>
                            <p className='text-gray-400'>Log in to like and comment on videos</p>
                            {/* <div className='pr-4'>
                                <GoogleLogin
                                    onSuccess={data => console.log('Google login success. Data: ', data)}
                                    onError={() => console.log('Google login error. Error')}
                                />
                            </div> */}
                            <div className="pr-4 ">
                                <button
                                    type='button'
                                    className='bg-white text-[#F51997] font-bold text-xl px-6 py-3 border-2 border-[#F51997]
                                        rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#F51997] cursor-pointer'
                                    onClick={() => login()}
                                >Login</button>
                            </div>
                        </div>
                    )}

                    <Discover />
                    <SuggestedAccounts />
                    <Footer />
                </div>
            )}
        </div>
    )
}

export default Sidebar 