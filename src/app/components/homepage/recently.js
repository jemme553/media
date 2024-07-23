'use client'
import { useEffect, useState } from 'react';
import useSWR, { preload } from 'swr'
import Post from '../post';

export default function Recently() {
    useEffect(() => document.body?.scrollTo(0,0),[])

    const fetcher = (url) => fetch(url).then((res) => res.json())
    preload('/api/getRecently', fetcher)
    const { data, error, isLoading } = useSWR('/api/getRecently', fetcher)
    !isLoading && console.log(data)
    return (
        <>
            <div className='flex flex-col gap-5 px-[5%]'>
                {
                    data && data.map((post, index) =>
                        <Post key={index} post={post} />
                    )
                }
            </div>
        </>
    )
}