'use client'
import { useEffect, useState } from 'react';
import Upload from '../components/homepage/upload';
import { useRouter } from "next/navigation";

export default function EditPost(post) {
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const router = useRouter();

    async function sendRequest(event) {
        let response = await fetch(`/api/${event}?post=${post.post}`,
            {
                method: 'POST',
                body: JSON.stringify(post.post)
            }
        ).then(res => res.json()).then(data => { return data })
        setDeleteModal(false)
        router.refresh()
    }

    const closeModal = (Delete) => {
        if (Delete == 'yes') {
            sendRequest('deletePost')
        } else {
            console.log('No')
        }
        setDeleteModal(false)
    }

    const hideModals = () => {
        setEditModal(false)
        setDeleteModal(false)
    }

    return (
        <>
            <div className="dropdown dropdown-end" >
                <div tabIndex={0} className="flex-none">
                    <button className="btn btn-square btn-ghost" onClick={() => hideModals()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                        </svg>
                    </button>
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li onClick={() => setEditModal(true)}>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                            Edit Post
                        </a>
                    </li>
                    <li onClick={() => setDeleteModal(true)}>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            Delete Post
                        </a>
                    </li>
                </ul>
            </div>
            {
                deleteModal &&
                <><input type="checkbox" id="my_modal_2" className="modal-toggle" defaultChecked={deleteModal} />
                    <div className="modal ">
                        <div className="modal-box max-w-none flex items-center justify-center flex-col">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            <h3 className="font-bold text-4xl text-colors-evestGreen-600 text-center py-5">Are You Sure ?</h3>
                            <p className="py-4 text-center text-xl">Delete this Post?</p>
                            <div className='flex gap-2'>
                                <div className="modal-action flex items-center justify-center">
                                    <label className="btn btn-primary" onClick={() => closeModal('yes')}>Yes</label>
                                </div>
                                <div className="modal-action flex items-center justify-center">
                                    <label className="btn btn-primary" onClick={() => closeModal('no')}>No</label>
                                </div>

                            </div>
                        </div>
                    </div></>
            }
            {
                editModal && <Upload type='edit' post={post} />
            }
        </>
    )
}