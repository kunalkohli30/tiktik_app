'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { topics } from '../../../utils/constants';

const Discover = () => {

    const topic = useSearchParams();

    // const {topic} = router.;
    const activeTopicStyle = "xl:border-2 hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997]";
    const topicStyle = "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";
    return (
        <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
            <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>Popular topics</p>
            <div className='flex gap-3 flex-wrap'>
                {topics.map(item => (
                    <Link href={`/?topic=${item.name}`} key={item.name} onClick={() => console.log(topic.entries)}>
                        <div className={topic.get('topic') === item.name ? activeTopicStyle : topicStyle}>
                            <span className='font-bold text-2xl xl:text-base'>{item.icon}</span>
                            <span className='hidden xl:block capitalize font-medium text-base'>{item.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Discover