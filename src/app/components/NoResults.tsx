import React from 'react'
import { MdOutlineVideocamOff } from 'react-icons/md';
import { BiCommentX } from 'react-icons/bi';
interface iProps {
  text: string
}
const NoResults = ({ text }: iProps) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <p className='text-8xl'>
        {text === 'No comments yet!' ? <BiCommentX /> : <MdOutlineVideocamOff />}
      </p>
      <p className='text-2xl text-center'>{text}</p>
    </div>
  )
}

export default NoResults