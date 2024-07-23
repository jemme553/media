'use client'
import { useEffect, useState } from 'react';
import useSWR, { preload } from 'swr'
import Post from '../components/post';
import { usePathname } from 'next/navigation'

export default function Videos() {
    const [user, setUser] = useState('')
    const pathname = usePathname()
    useEffect(() => {
        const user = localStorage.getItem('user')
        let userDetails = JSON.parse(user)
        setUser(userDetails)
    }, [])
    const fetcher = (url) => fetch(url).then((res) => res.json())
    preload('/api/getVideos', fetcher)
    const { data, error, isLoading } = useSWR(pathname.includes('profile') ? `/api/getVideos?id=${user && user.idusers}` : '/api/getVideos', fetcher)

    !isLoading && data && console.log(data)
    return (
        <div className='flex flex-col gap-5 px-[5%]'>
            {
                data && data.map((post, index) =>
                    <Post key={index} post={post} />
                )
            }
        </div>
    )
}