'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from 'react';
function NavBar() {
    const router = useRouter();

    function signOut() {
        localStorage.removeItem('loggedIn')
        localStorage.removeItem('Token')
        localStorage.removeItem('user')
        router.push('/')
        router.refresh()
    }

    return (
        <div id='NavBar' className='flex justify-center items-center px-[5%]'>
            <nav className="w-full top-0 left-0 right-0 z-10 container">
                <div className="mx-auto">
                    <div>
                        <div className="flex w-full items-center justify-between py-3 h-[70px]">
                            {/* LOGO */}
                            <Link href="/">
                                <h2 className="text-2xl text-cyan-600 font-bold">LOGO</h2>
                            </Link>
                            {/* Profile Icon */}
                            <div className='flex gap-2'>
                                <button className="py-2 text-gray-700 rounded-md outline-none">
                                    <Link href='/profile'>
                                        <Image src='/user.png' width={30} height={30} className='h-[30px]' alt='user' />
                                    </Link>
                                </button>
                                <button onClick={() => signOut()} className="py-2 text-gray-700 rounded-md outline-none">
                                    <Image src='/exit.svg' width={30} height={30} className='h-[30px]' alt='user' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
