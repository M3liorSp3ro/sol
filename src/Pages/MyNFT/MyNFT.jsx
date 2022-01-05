
import React from 'react'
import { useNavigate } from 'react-router'
import CardContent from '../../components/CardContent/CardContent'
import Loader from '../../components/Loader/Loader'
import './MyNFT.scss'

const MyNFT = () => {

    const history = useNavigate()

    return (
        <CardContent title={'NFT Management'}>
            <div className="nftPage">
                <div className='nftPage__leftBlock'>
                    <div className="nftPage__leftBlock_title">
                        NFT Management
                    </div>

                    <div className="nftPage__leftBlock_desc">
                        NFT's in your wallet
                        <div>Any NFT created using the address connected to Solminter will appear below. To trade them, add the NFT address to your Solana wallet.</div>
                    </div>
                </div>
                <div onClick={() => {
                    history({ pathname: '/create' })
                }} className="gitBook">
                    Create page
                </div>

            </div>
            <div className="loader">
                <Loader />
            </div>
        </CardContent>
    )
}

export default MyNFT
