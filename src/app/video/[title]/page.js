'use client'
import ReactPlayer from 'react-player'
export default function Video({params}) {
    console.log(params)
    return (
        <div>
            <ReactPlayer url={`/video/${params.title}.mp4`} controls={true} width='100%' height='300px' />
            <p className='text-2xl text-cyan-600 pb-10'>{params.title}</p>
        </div>
    );
}