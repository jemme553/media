'use client'
import { useEffect, useState } from 'react';
import useSWR, { preload } from 'swr'
import Post from '../components/post';
import { usePathname } from 'next/navigation'

export default function Photos() {
    useEffect(() => document.body?.scrollTo(0, 0), [])
    const fetcher = (url) => fetch(url).then((res) => res.json())
    const [user, setUser] = useState('')
    const pathname = usePathname()
    useEffect(() => {
        const user = localStorage.getItem('user')
        let userDetails = JSON.parse(user)
        setUser(userDetails)
    }, [])
    preload('/api/getPhotos', fetcher)
    const { data, error, isLoading } = useSWR(pathname.includes('profile') ? `/api/getPhotos?id=${user && user.idusers}` : '/api/getPhotos', fetcher)

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