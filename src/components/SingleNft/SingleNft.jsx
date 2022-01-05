import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react/cjs/react.development'
import { useNavigate } from 'react-router'
import { createpage } from '../../constants'

const SingleNft = ({ step, setStep }) => {

    const [drag, setDrag] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState('')

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
        console.log(files[0]);
        setDrag(false)
    }

    const whatStep = (step) => {
        if (step === '1') {
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
                                    preview
                                        ? <img src={preview} alt="preview" />
                                        : 'Перетащите файлы, чтобы загрузить их'
                                }
                            </div>
                    }
                </div>
            )
        } else if (step === '2') {
            return (
                <div>Upload</div>
            )
        } else if (step === '3') {
            return (
                <div>Info</div>
            )
        } else if (step === '4') {
            return (
                <div>Royalties</div>
            )
        } else if (step === '5') {
            return (
                <div>Launch</div>
            )
        }
    }

    useEffect(() => {
        if (selectedFile) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(selectedFile)
        } else {
            setPreview('')
        }
    }, [selectedFile])

    return (
        <>
            {whatStep(step)}
            <div onClick={() => {
                console.log(step);
                if (+step < 5) {
                    setStep(+step + 1)
                    history({ pathname: `${createpage}/${+step + 1}` })
                }

            }} className="gitBook">
                Next step
                    </div>
        </>
    )
}

export default SingleNft
