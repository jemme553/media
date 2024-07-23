'use client'
import Image from 'next/image';
import Edit from '/public/edit.svg'
import Videos from '../videos/page';
import Photos from '../photos/page';
import Link from "next/link";
import React,{ useEffect, useState, useRef } from 'react';
import MyPosts from '../components/homepage/myPosts';
import ProfilePicture from '../components/profile-picture/profile-picture';
import email from '/public/email.svg'
import { useRouter } from "next/navigation";
// import React, { useState, useRef } from "react";
import {Camera} from "react-camera-pro";

export default function Page() {
  const router = useRouter();
  const camera = useRef(null);
  const [image, setImage] = useState(null);

  const [viewComponent, setViewComponent] = useState('all')
  const [user, setUser] = useState('')
  const [edit, setEdit] = useState(false)
  const [details, setDetails] = useState('')
  const [missingData, setMissingData] = useState()
  const [formData, setFormData] = useState({
    email: user.email,
    phone: user.phone,
    address: user.address,
    relationship: user.relationship,
    id: user.idusers,
    name: user.name
  })

  useEffect(() => {
    const user = localStorage.getItem('user')
    let userDetails = JSON.parse(user)
    setUser(userDetails)
    formData.address = userDetails.address
    formData.email = userDetails.email
    formData.phone = userDetails.phone
    formData.relationship = userDetails.relationship
    formData.id = userDetails.idusers
    formData.name = userDetails.name
    for (const [key, value] of Object.entries(userDetails)) {
      if (value == null) {
        setDetails(null)
      }
    }
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (formData.email != '' && formData.phone != '') {
      setMissingData('')
      let updateUser = await fetch(`/api/updateUser`,
        {
          method: 'POST',
          body: JSON.stringify(formData)
        }
      ).then(res => res.json()).then(data => { return data })
      localStorage.setItem('user', JSON.stringify(updateUser.data))
      setUser(updateUser.data)
      formData.address = updateUser.data.address
      formData.email = updateUser.data.email
      formData.phone = updateUser.data.phone
      formData.relationship = updateUser.data.relationship
      formData.id = updateUser.data.idusers
      formData.name = updateUser.data.name
      setEdit(false)
    } else {
      setMissingData('*Email or Phone is missing')
    }
  }

  return (
    <div className='flex flex-col gap-4 w-full'>
      <Camera ref={camera} />
      
      {
        !edit &&
        <ul className=" self-center text-md font-medium text-center text-gray-500 rounded-lg shadow flex dark:divide-gray-700 dark:text-gray-400">
          <li className="w-full focus-within:z-10">
            <p onClick={setImage(camera.current.takePhoto())} className="flex items-center justify-center gap-3 w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
              Edit Profile
              <Image src={Edit} className='w-[30px] h-[30px]' />
            </p>
          </li>
        </ul>
      }
      <ProfilePicture />
      {
        !edit &&
        <>
          <div className='flex flex-col justify-center items-center'>
            <p className='text-bold text-2xl'>{user && user.name}</p>
            <p>100 Friends</p>
          </div>
          <div className='h-[5px] bg-gray-500 w-full'></div>
        </>
      }
      <div className='flex flex-col px-[5%] gap-2'>
        {edit ?
          <form onSubmit={onSubmit} className=" gap-5 flex flex-col mt-10 py-5 z-[10] px-[5%]" >
            <label className="input input-bordered flex items-center gap-2">
              <Image src={email} alt='email' />
              <input type="email" className="grow" placeholder="email@example.com" value={formData.email} onChange={() => { setFormData({ ...formData, email: event.target.value }) }} />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg aria-hidden="true" focusable="false" className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em"><path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z" /></svg>
              <input type="number" className="grow" placeholder="Phone" value={formData.phone} onChange={() => { setFormData({ ...formData, phone: event.target.value }) }} />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Full Name" value={formData.name} onChange={() => { setFormData({ ...formData, name: event.target.value }) }} />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Address" value={formData.address} onChange={() => { setFormData({ ...formData, address: event.target.value }) }} />
            </label>
            <select className="select select-bordered w-full" value={formData.relationship} onChange={() => { setFormData({ ...formData, relationship: event.target.value }) }}>
              <option disabled selected>Relationship</option>
              <option value='In Relationship'>In Relationship</option>
              <option value='Single'>Single</option>
              <option value='Married'>Married</option>
              <option value='Open Relationship'>Open Relationship </option>
            </select>
            <input type="submit" className="btn  btn-info" value='Save' />
            {
              missingData != '' &&
              <p className="text-[#FF0000] text-bold">{missingData}</p>
            }
          </form>
          :
          <>
            <p>Email : {user && user.email}</p>
            <p>Phone: {user && user.phone}</p>
            <p>Address: {user && user.address}</p>
            <p>Relationship : {user && user.relationship}</p>
          </>
        }
        {
          details == null && !edit &&
          <p className='self-center text-red-500'>Complete your profile by <span className='text-blue-500'>Click Here</span> </p>
        }
      </div>
      {
        !edit &&
        <>
          <div className='h-[3px] bg-gray-500 w-full'></div>
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between px-[5%]'>
              <div>
                <p className='text-bold'>Friends</p>
                <p>100 Friends</p>
              </div>
              <Link href='/friends'>See All</Link>
            </div>
            <div className='grid grid-cols-3 px-[5%] gap-x-2'>
              <div className='flex flex-col'>
                <p className='bg-[#FF0000] h-[100px] rounded-lg'>Image</p>
                <p>Name</p>
              </div>
              <div>
                <p className='bg-[#FF0000] h-[100px] rounded-lg'>Image</p>
                <p>Name</p>
              </div>
              <div>
                <p className='bg-[#FF0000] h-[100px] rounded-lg'>Image</p>
                <p>Name</p>
              </div>
              <div>
                <p className='bg-[#FF0000] h-[100px] rounded-lg'>Image</p>
                <p>Name</p>
              </div>
              <div>
                <p className='bg-[#FF0000] h-[100px] rounded-lg'>Image</p>
                <p>Name</p>
              </div>
              <div>
                <p className='bg-[#FF0000] h-[100px] rounded-lg'>Image</p>
                <p>Name</p>
              </div>
            </div>
          </div>
          <div className='h-[3px] bg-gray-500 w-full'></div>
          <ul className="text-sm font-medium text-center text-gray-500 rounded-lg shadow flex dark:divide-gray-700 dark:text-gray-400">
            <li className="w-full focus-within:z-10" onClick={() => setViewComponent('all')}>
              <p className="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">All Posts</p>
            </li>
            <li className="w-full focus-within:z-10" onClick={() => setViewComponent('videos')}>
              <p className="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Videos</p>
            </li>
            <li className="w-full focus-within:z-10" onClick={() => setViewComponent('photos')}>
              <p className="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Photos</p>
            </li>
          </ul>
          {
            viewComponent == 'photos' ?
              <Photos />
              : viewComponent == 'videos' ?
                <Videos />
                : <MyPosts />
          }
        </>
      }
    </div>
  );
}