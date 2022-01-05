import React from 'react'
import { useNavigate } from 'react-router'
import './MyNFT.scss'

const MyNFT = () => {

const history = useNavigate()

    return (
        <div className='myNftPage'>
            mynft
            <div onClick={() => {
                history({pathname: '/create'})
            }} className="gitBook">
                Create page
            </div>
        </div>
    )
}

export default MyNFT
