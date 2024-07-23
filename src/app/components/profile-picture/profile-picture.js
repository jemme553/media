'use client'
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import camera from '/public/camera.svg'
import avatar from '/public/avatar.svg'

export default function ProfilePicture() {
    const router = useRouter();
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [showPhoto, setShowPhoto] = useState('')
    const [previewImage, setPreviewImage] = useState('/upload.svg')
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalText, setModalText] = useState('')
    const [modalIcon, setModalIcon] = useState(true)
    const [title, setTitle] = useState('')
    const [data, setData] = useState({
        blob: '',
        fileName: '',
        fileType: '',
        fileSize: '',
        title: '',
        userId: '',
        category: 'profile picture',
        profilePicture: ''
    })

    const imageFormats = [
        'jpeg',
        'jpg',
        'png',
        'webp'
    ]

    const closeModal = (title) => {
        setShowModal(false)
        if (title == 'Success') {
            router.refresh()
        }
    }

    useEffect(() => {
        const user = localStorage.getItem('user');
        const userParser = JSON.parse(user)
        data.userId = parseInt(userParser.idusers)
        data.profilePicture = userParser.picture ? '/' + userParser.picture.replace(/\\/g, '/') : avatar
    }, [])

    const getBlob = (file) => new Promise((resolve, rejects) => {
        const reader = new FileReader()
        reader.onload = (event) => {
            resolve(event.target.result)
        }
        reader.readAsDataURL(file)
    })

    const uploadFiles = (file) => {
        if (file) {
            setPreviewImage(URL.createObjectURL(file))
            console.log(file)
            getBlob(file)
                .then(blob => {
                    setShowPhoto(true)
                    data.fileName = file.name
                    data.fileType = file.type
                    data.fileSize = file.size
                    const bb = blob.split(',', 2)
                    data.blob = bb[1]
                })
        }
    }

    function modalProps(title, text, icon) {
        setModalTitle(title)
        setModalText(text)
        setShowModal(true)
        setModalIcon(icon)
    }

    const Upload = async () => {
        data.title = title
        let type = data.fileType
        if (imageFormats.includes(type.split('/')[1])) {
            const addPhoto = await fetch(`/api/changeProfilePicture`,
                {
                    method: 'POST',
                    body: JSON.stringify(data)
                }
            ).then(res => res.json()).then(data => { return data })
            if (addPhoto.err) {
                modalProps("Error", addPhoto.err, false)
            } else {
                modalProps("Success", 'the picture have been uploded successfully', true)
            }
        } else {
            modalProps("Image Format is not acceptable", 'You can choose one from those Image formats: jpeg, jpg, png, gif, webp', false)
        }
    }

    return (
        <>
            <div onClick={() => setShowUploadModal(true)} for='photo' className='w-[200px] h-[200px] rounded-[50%] self-center relative'>
                <Image src={data.profilePicture} width={200} height={200} className='w-[200px] h-[200px] rounded-[50%] self-center' />
                <div className='flex items-center justify-center w-[50px] bg-gray-300 h-[50px] rounded-[50%] absolute bottom-0 right-0'>
                    <Image src={camera} className='w-[30px] h-[30px]' />
                </div>
            </div>
            {
                showUploadModal &&
                <><input type="checkbox" id="my_modal_1" className="modal-toggle" defaultChecked={showUploadModal} />
                    <div className="modal items-start ">
                        <div className="modal-box max-w-none w-[100%] h-[500px] flex items-center  flex-col">
                            <div className="modal-action self-end mt-0 mb-4">
                                <Image onClick={() => setShowUploadModal(false)} src='/close.svg' width={30} height={30} className='h-[30px] self-center' alt='user' />
                            </div>
                            <input type="text" id='title' onChange={(event) => setTitle(event.target.value)} placeholder="Title/Description" className="input input-bordered input-info w-full" />
                            <form className={`flex flex-col justify-between h-[100%]`} >
                                <div className='flex gap-2 items-center justify-center mt-3'>
                                    <label for='photo' className='text-bold flex flex-col btn btn-outline btn-info  max-w-xs' >
                                        <Image src='/photo.svg' width={30} height={30} className='h-[30px] self-center' alt='user' />
                                    </label>
                                    <input type='file' id="photo" className="hidden" onChange={(e) => uploadFiles(e.target.files[0])} />
                                </div>
                                {
                                    showPhoto &&
                                    <Image src={previewImage} width={50} height={50} className='w-[200px] h-[200px] rounded-[50%] self-center' alt='user' />
                                }
                                <Image src='/upload.svg' onClick={() => Upload()} width={50} height={50} className='h-[50px] self-center' alt='user' />
                            </form>
                        </div>
                    </div></>
            }
            {
                showModal &&
                <><input type="checkbox" id="my_modal_2" className="modal-toggle" defaultChecked={showModal} /><div className="modal ">
                    <div className="modal-box max-w-none flex items-center justify-center flex-col">
                        {
                            modalIcon ?
                                <svg width="86" height="81" viewBox="0 0 86 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M60.7058 12.647H72.0882C73.4852 12.647 74.6176 13.7795 74.6176 15.1765V23.0809L84.9647 30.8412C85.5923 31.3014 86 32.0443 86 32.8823V78.4117C86 79.8087 84.8676 80.9411 83.4706 80.9411H2.52944C1.13244 80.941 0 79.8085 0 78.4115V32.8823C0 32.0443 0.407491 31.3014 1.03536 30.8412L11.3824 23.0809V15.1765C11.3824 13.7795 12.5148 12.647 13.9118 12.647H25.2942L41.4823 0.505921C42.3816 -0.16864 43.6182 -0.16864 44.5177 0.505921L60.7058 12.647ZM16.4411 42.6386L30.0999 55.6469H57.1286L69.5672 43.2084C69.5614 43.1397 69.5586 43.07 69.5586 42.9999V17.7059H16.4411V42.6386ZM52.2745 12.647L42.9999 5.69111L33.7254 12.647H52.2745ZM74.6175 38.1581L79.6196 33.156L74.6175 29.4044V38.1581ZM11.3824 37.8206V29.4044L6.43857 33.1123L11.3824 37.8206ZM57.2892 60.7058H29.0881C28.9683 60.7058 28.8494 60.6972 28.7322 60.6806C28.6138 60.7738 28.498 60.8649 28.3521 60.9796C27.5262 61.6293 26.6038 62.3529 25.6078 63.1325C22.7621 65.3595 19.8964 67.5868 17.1927 69.6664C16.9421 69.8593 16.9421 69.8593 16.6912 70.0519C13.4148 72.5686 10.9302 74.4666 9.01705 75.8821H76.2595L57.2892 60.7058ZM5.05887 38.7842V72.4789C5.13849 72.4211 21.3716 59.961 24.6512 57.4437L5.05887 38.7842ZM80.941 73.1489V38.9888L61.9632 57.9666L80.941 73.1489ZM41.7353 39.4227L51.3291 29.8288C52.317 28.841 53.9185 28.841 54.9062 29.8288C55.894 30.8167 55.894 32.4182 54.9062 33.4059L43.5238 44.7883C42.536 45.7761 40.9344 45.7761 39.9468 44.7883L33.6232 38.4648C32.6354 37.477 32.6354 35.8754 33.6232 34.8877C34.6111 33.8999 36.2127 33.8999 37.2003 34.8877L41.7353 39.4227Z" fill="#058080" />
                                </svg>
                                :
                                <Image src='/error.svg' width={80} height={80} alt='Error' />
                        }
                        <h3 className="font-bold text-4xl text-colors-evestGreen-600 text-center py-5">{modalTitle}</h3>
                        <p className="py-4 text-center text-xl">{modalText}</p>
                        <div className="modal-action flex items-center justify-center">
                            <label className="btn btn-primary" onClick={() => closeModal(modalTitle)}>Close</label>
                        </div>
                    </div>
                </div></>
            }
        </>
    )
}