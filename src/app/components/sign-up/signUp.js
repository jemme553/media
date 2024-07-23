'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import userAvatar from '/public/userAvatar.svg'
import email from '/public/email.svg'
import signupBG from '/public/morning-sex.gif'
import Image from 'next/image';

export default function SignUp() {
    const router = useRouter();
    const [missingData, setMissingData] = useState()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phone: '',
        name: ''
    })

    useEffect(() => {
        const navbar = document.getElementById('NavBar');
        navbar.style.display = 'none'
    })

    const onSubmit = async (e) => {
        e.preventDefault()
        if (formData.password != '' && formData.email != '' && formData.phone != '' && formData.name != '') {
            setMissingData('')
            let register = await fetch(`/api/signUp`,
                {
                    method: 'POST',
                    body: JSON.stringify(formData)
                }
            ).then(res => res.json()).then(data => { return data })
            router.push('/')
        } else {
            setMissingData('*Some Data Is Missing')
        }
    }
    return (
        <div className="relative flex flex-col justify-between h-screen py-20">
            <div className="absolute top-0 left-0 h-full w-[100%]">
                <Image src={signupBG} className='w-[100%] h-full'/>
            </div>
            <h1 className="text-info text-center text-4xl z-[10] px-[5%] text-bold">Join Us For Free</h1>
            <form onSubmit={onSubmit} className=" gap-5 flex flex-col mt-10 py-5 z-[10] px-[5%]" >
                <label className="input input-bordered flex items-center gap-2">
                    <Image src={userAvatar} alt='userAvatar' />
                    <input type="text" className="grow" placeholder="Full Name" value={formData.name} onChange={() => { setFormData({ ...formData, name: event.target.value }) }} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg aria-hidden="true" focusable="false" className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em"><path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z" /></svg>
                    <input type="number" className="grow" placeholder="Phone" value={formData.phone} onChange={() => { setFormData({ ...formData, phone: event.target.value }) }} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <Image src={email} alt='email' />
                    <input type="email" className="grow" placeholder="email@example.com" value={formData.email} onChange={() => { setFormData({ ...formData, email: event.target.value }) }} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input type="password" className="grow" placeholder="******" value={formData.password} onChange={() => { setFormData({ ...formData, password: event.target.value }) }} />
                </label>
                {/* <label className="input input-bordered flex items-center gap-2">
                    <input type="Date" className="grow" placeholder="BirthDate" value={formData.password} onChange={() => { setFormData({ ...formData, password: event.target.value }) }} />
                </label> */}
                <p className="text-bold">By submitting this form you certify you are 18 years or older, because this website contains pornographic content and is only for adults above the age of 18, it is only intended for entertainment purposes.</p>
                <input type="submit" className="btn  btn-info" value='Sign Up' />
                {
                    missingData != '' &&
                    <p className="text-[#FF0000] text-bold">{missingData}</p>
                }
            </form>
            <Link href='/sign-in' className="btn btn-outline btn-info z-[10] mx-[5%]">Already Have An Account?</Link>
        </div>
    );
}
