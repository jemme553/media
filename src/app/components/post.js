'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import avatar from '/public/avatar.svg'
import ReactPlayer from 'react-player'
import EditPost from '../components/editPost';

export default function Post(post) {
    const [fullScreen, setFullScreen] = useState(false)
    const [fullScreenProfile, setFullScreenProfile] = useState(false)
    const [before, setBefore] = useState('')
    const [edit, setEdit] = useState(false)
    const photodate = new Date(post.post.date)
    const category = post.post.category
    const currDate = new Date()
    const day = currDate.getDate();
    const hour = currDate.getHours();
    const minutes = currDate.getMinutes();
    const photoDay = photodate.getDate()
    const photoHour = photodate.getHours()
    const photoMinutes = photodate.getMinutes()
    const URL = post.post.url.replace(/\\/g, '/')
    const profilePicture = post.post.picture ? '/' + post.post.picture.replace(/\\/g, '/') : avatar
    useEffect(() => {
        const userIDid = localStorage.getItem('id')
        let userDetails = JSON.parse(userIDid)
        if (userDetails == post.post.userid) {
            setEdit(true)
        }
    }, [])
    useEffect(() => {
        if (day == photoDay) {
            if (hour == photoHour) {
                setBefore(`${minutes - photoMinutes}M`)
            } else {
                setBefore(`${hour - photoHour}H`)
            }
        } else {
            setBefore(`${day - photoDay}D`)
        }
    }, [currDate])

    return (
        <div>
            <div className='mb-2 flex justify-between'>
                <div className='flex gap-4'>
                    <div onClick={() => setFullScreenProfile(!fullScreenProfile)} className={`${fullScreenProfile && 'w-full fixed top-0 left-0 bg-black h-full flex flex-col justify-center z-[999]'}`}>
                        <Image alt='user' width={fullScreenProfile ? 300 : 60} height={fullScreenProfile ? 300 : 60} className={fullScreenProfile ? 'w-full self-center' : `w-[60px] h-[60px] rounded-[50%]`} src={profilePicture} />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <p className=''>{post.post.name}</p>
                        <p className='text-warning'>{before}</p>
                    </div>
                </div>
                { edit && <EditPost post={post.post}/> }
            </div>
            <h1 className='text-[18px] mb-2'>{post.post.title}</h1>
            {
                category.includes('picture') ?
                    <div className={`w-full ${fullScreen && 'fixed top-0 left-0 bg-black h-full flex flex-col justify-center z-[999]'}`} onClick={() => setFullScreen(!fullScreen)}>
                        <Image className={`w-full `} alt={URL} src={`/${URL}`} width={100} height={100} />
                    </div>
                    : category.includes('picture') && post.post.url && <ReactPlayer url={URL} controls={true} width='100%' height='300px' />
            }
            <p className='text-info py-2 text-[18px]'>20 Likes</p>
            <ul className="text-sm font-medium text-center text-gray-500 rounded-lg shadow flex dark:divide-gray-700 dark:text-gray-400">
                <li class="w-full focus-within:z-10">
                    <a href="#" class="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Like</a>
                </li>
                <li class="w-full focus-within:z-10">
                    <a href="#" class="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Comment</a>
                </li>
            </ul>
        </div>
    )
}