'use client'


import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getData } from "./dataFetch";
import { Video } from "../../types";
import NoResults from "./components/NoResults";
import VideoCard from "./components/VideoCard";

interface Iprops {
  videos: Video[];
}

export default function Home() {

  const [videos, setVideos] = useState<Video[] | null>(null);

  useEffect(() => {
    const data = getData().then(resp => setVideos(resp?.props?.videos));
  }, [])

  return (
    <h1 className="flex flex-col gap-10 videos h-full">
      {
        videos?.length ?
          videos.map((video: Video) => (
            <VideoCard post={video} key={video?._id} />
          )) : (
            <NoResults text='No Videos' />
          )
      }
    </h1>
  );
}

// export const getServerSideProps = async() => {
//   const response = await axios.get(`http://localhost:3000/api/post`);
//   console.log(response.data.name);  

//   return {
//     props: {}
//   }
// }