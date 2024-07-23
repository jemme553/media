'use client'
import { useEffect, useState } from 'react';
import Recently from '../components/homepage/recently';
import Videos from '../videos/page';
import Photos from '../photos/page';
import Friends from '../friends/page';
import Notifications from '../notifications/page';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import SignIn from '../sign-in/page'
import Image from 'next/image';
import Upload from '../components/homepage/upload';

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const tabs = ['home', 'video', 'photo', 'friends', 'notifications']
  useEffect(() => document.body?.scrollTo(0, 0), [])
  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn')
    setIsLoggedIn(loggedIn)
    const navbar = document.getElementById('NavBar');
    if (isLoggedIn) {
      navbar.style.display = 'flex'
    }
  })

  return (
    <>
      {
        isLoggedIn ?
          <Tabs className='container'>
            <TabList className='flex sticky bottom-0 top-0 bg-[#FFF] w-full justify-between py-5 gap-2 px-[5%] '>
              {
                tabs.map((tab, index) =>
                  <Tab className='bg-[#FFF] p-0 border-0 shadow-none' key={index}><Image src={`/${tab}.svg`} width={30} height={30} className='h-[30px]' alt={tab} /></Tab>
                )
              }
            </TabList>
            <TabPanel>
              <div className='flex gap-5 my-5 px-[5%]' onClick={() => setShowUploadModal(true)}>
                <input type="text" id='title' placeholder="Title/Description" className="input input-bordered input-info w-full" />
                <Image src='/upload.svg' width={50} height={50} className='h-[50px] self-center' alt='user' />
              </div>
              <Recently />
            </TabPanel>
            <TabPanel><Videos /></TabPanel>
            <TabPanel><Photos /></TabPanel>
            <TabPanel><Friends /></TabPanel>
            <TabPanel><Notifications /></TabPanel>
          </Tabs>
          :
          <SignIn />
      }
      {
        showUploadModal && <Upload type='upload'/>
      }
    </>
  )
}