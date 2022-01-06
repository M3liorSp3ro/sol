import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { createpage } from '../../constants'
import { toast } from 'react-toastify'
import Input from '../Input/Input'
import VideoPlayer from 'react-video-js-player'

import './SingleNft.scss'
import Loader from '../Loader/Loader'

const SingleNft = ({ step, setStep }) => {

    const [drag, setDrag] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState('')
    const [previewVideo, setPreviewVideo] = useState('')
    const [fileFormat, setFileFormat] = useState('')

    const [uploadDataTitle, setUploadDataTitle] = useState('')
    const [uploadDataDesc, setUploadDataDesc] = useState('')
    const [uploadDataSymbol, setUploadDataSymbol] = useState('')
    const [uploadDataUrl, setUploadDataUrl] = useState('')
    const [infoPercent, setInfoPercent] = useState('')

    const [loading, setLoading] = useState(false)
    const [loadingUpload, setLoadingUpload] = useState(true)

    const uploadStep = useRef()

    const [addresses, setAddresses] = useState([
        {
            address: localStorage.getItem('tokenSol'),
            percent: 0
        }
    ])

    const history = useNavigate()

    const dragStartHandler = (e) => {
        e.preventDefault()
        setDrag(true)
    }

    const dragLeaveHandler = (e) => {
        e.preventDefault()
        setDrag(false)
    }

    const onDropHandler = (e) => {
        e.preventDefault()
        let files = [...e.dataTransfer.files]
        setSelectedFile(files[0])
        setFileFormat(files[0].name.split('.')[files[0].name.split('.').length - 1])
        console.log(files[0]);
        setDrag(false)
    }

    const nextStep = (step) => {



        if (+step < 5) {
            setStep(+step + 1)
            history({ pathname: `${createpage}/${+step + 1}` })
            // if (step === '1' && selectedFile) {
            //     setStep(2)
            //     history({ pathname: `${createpage}/2` })
            // } else if (step === '1' && !selectedFile) {
            //     toast.error('Добавьте файл')
            // }

            // if (step === '2' && uploadDataUrl.length > 0 && uploadDataTitle.length > 0 && uploadDataSymbol.length > 0 && uploadDataDesc.length > 0) {
            //     setStep(3)
            //     history({ pathname: `${createpage}/3` })
            // } else if (step === '2' && (uploadDataUrl.length === 0 || uploadDataTitle.length === 0 || uploadDataSymbol.length === 0 || uploadDataDesc.length === 0)) {
            //     toast.error('Заполните все поля')
            // }

        }
    }

    const whatStep = (step) => {
        if (+step === 1) {
            return (
                <div className="blockDesc">
                    Now, let's upload your creation
                    <div className='littleText'>Your file will be uploaded to the decentralized web via Arweave.
                    Depending on file type, can take up to 1 minute.
                    Arweave is a new type of storage that backs data with sustainable and perpetual endowments,
                    allowing users and developers to truly store data forever – for the very first time.
            </div>
                    <div className='blockDesc__upload'>Upload your artwork (PNG, JPG, GIF, SVG, MP4)</div>



                    {
                        drag
                            ? <div
                                onDragStart={e => dragStartHandler(e)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragOver={e => dragStartHandler(e)}
                                onDrop={e => onDropHandler(e)}
                                className="dropArea">Отпустите файлы, чтобы загрузить их</div>
                            : <div
                                onDragStart={e => dragStartHandler(e)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragOver={e => dragStartHandler(e)}
                                className="dropArea">
                                {
                                    loading ? <Loader />
                                        : fileFormat === 'mp4' && previewVideo
                                            ? <video controls className='videoPlayer'>
                                                <source type="video/mp4" src={previewVideo} />
                                            </video>

                                            : preview
                                                ? <img src={preview} alt="preview" />
                                                : 'Перетащите файлы, чтобы загрузить их'
                                }




                            </div>
                    }
                </div>
            )
        } else if (+step === 2) {
            return (
                loadingUpload
                    ? <Loader />
                    : <div ref={uploadStep} className='uploadStep'>
                        <div className="dropArea">
                            {
                                fileFormat === 'mp4' && previewVideo
                                    ? <video controls className='videoPlayer'>
                                        <source type="video/mp4" src={previewVideo} />
                                    </video>

                                    : <img src={preview} alt="preview" />

                            }
                        </div>
                        <div className="uploadStep__form">
                            <Input value={uploadDataTitle} onChange={setUploadDataTitle} title='Title' />
                            <Input value={uploadDataSymbol} onChange={setUploadDataSymbol} title='Symbol' />
                            <Input value={uploadDataDesc} onChange={setUploadDataDesc} title='Description' />
                            <Input value={uploadDataUrl} onChange={setUploadDataUrl} title='External' />
                        </div>

                    </div>

            )
        } else if (+step === 3) {
            return (
                <div className='infoStep'>
                    <div className="infoStep__firstBLock">
                        <div className="infoStep__firstBLock_title">Set royalties and creator splits</div>
                        <div className="infoStep__firstBLock_desc">
                            Royalties ensure that you continue to get compensated for your work after its initial sale.
                        </div>
                    </div>
                    <div className="infoStep__secondBLock">
                        <div className="infoStep__secondBLock_title">Royalty Percentage</div>
                        <div className="infoStep__secondBLock_desc">This is how much of each secondary sale will be paid out to the creators.</div>
                        <div className="infoStep__secondBLock_input">
                            <Input value={infoPercent} onChange={setInfoPercent} />
                        </div>
                    </div>

                    <div className="infoStep__secondBLock">
                        <div className="infoStep__secondBLock_title">Creators Split</div>
                        <div className="infoStep__secondBLock_desc">This is how much of the proceeds from the
                         initial sale and any royalties will be split out amongst the creators.</div>
                        {addresses.map((el, i) => {
                            return (
                                <div key={i} className="infoStep__secondBLock_input">
                                    <div className='infoStep__secondBLock_input_address'>
                                        {`${el.address.slice(0, 4)}...${el.address.slice(Math.max(el.address.length - 4, 0))}`}
                                    </div>

                                    <Input value={el.percent} />
                                </div>
                            )
                        })}

                    </div>
                </div>
            )
        } else if (+step === 4) {
            return (
                <div className='royalties'>
                    <div className="dropArea">
                        {
                            fileFormat === 'mp4' && previewVideo
                                ? <video controls className='videoPlayer'>
                                    <source type="video/mp4" src={previewVideo} />
                                </video>

                                : <img src={preview} alt="preview" />

                        }
                    </div>
                    <div className="royalties__title">{uploadDataTitle}</div>
                    <div className="royalties__infoBlock">
                        <div className="royalties__infoBlock_percent">Royalty Percentage: {infoPercent}%</div>
                        <div className="royalties__infoBlock_cost">Cost to Create <span>$1</span></div>
                    </div>
                </div>
            )
        } else if (+step === 5) {
            return (
                <div>Launch</div>
            )
        }
    }

    useEffect(() => {
        if (selectedFile) {
            const reader = new FileReader()
            reader.onloadend = () => {
                if (fileFormat === 'mp4') {
                    setLoading(true)
                }

                setPreview(reader.result)
            }
            reader.readAsDataURL(selectedFile)
        } else {
            setPreview('')
        }
    }, [selectedFile])

    useEffect(() => {
        console.log('preview', preview);
        if (fileFormat === 'mp4') {
            setLoading(true)
            setPreviewVideo(preview)
        } else {
            setPreviewVideo('')
        }
    }, [preview])

    useEffect(() => {
        if (previewVideo) {
            setLoading(false)
        }
    }, [previewVideo])

    useEffect(() => {
        console.log('fileformat', fileFormat);
    }, [fileFormat])

    useEffect(() => {
        // console.log('uploadStep', uploadStep);
        // if (uploadStep) {
        //     setLoadingUpload(false)
        // } else {
        //     setLoadingUpload(true)
        // }

    }, [uploadStep])

    useEffect(() => {
        if (+step === 2) {
            setTimeout(() => {
                setLoadingUpload(false)
            }, 1500)
        }
    }, [step])

    useEffect(() => {
        console.log('loadingUpload', loadingUpload);
    }, [loadingUpload])

    return (
        <>
            {whatStep(step)}
            <div onClick={() => {
                console.log(step);
                nextStep(step)

            }} className="gitBook">
                Next step
                    </div>
        </>
    )
}

export default SingleNft
