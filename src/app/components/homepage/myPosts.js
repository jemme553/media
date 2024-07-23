'use client'
import { useEffect, useState } from 'react';
import Post from '../post';
import useSWR, { preload } from 'swr'

export default function MyPosts() {
    const [user, setUser] = useState('')
    useEffect(() => {
        const user = localStorage.getItem('user')
        let userDetails = JSON.parse(user)
        setUser(userDetails)
    }, [])
    const fetcher = (url) => fetch(url).then((res) => res.json())
    preload('/api/getRecently', fetcher)
    const { data, error, isLoading } = useSWR(`/api/getRecently?id=${user && user.idusers}`, fetcher)

    return (
        <div className='flex flex-col gap-5 px-[5%]'>
            {
                data && data.map((post, index) =>
                    <Post post={post} key={index}/>
                )
            }
        </div>
    )
}