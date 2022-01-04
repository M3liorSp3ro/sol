import React from 'react'
import { useNavigate } from 'react-router'

const MyNFT = () => {

const history = useNavigate()

    return (
        <div>
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
