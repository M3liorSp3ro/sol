import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import CardContent from '../../components/CardContent/CardContent';
import SingleNft from '../../components/SingleNft/SingleNft';
import Stepper from '../../components/Stepper/Stepper';
import { createpage, homepage } from '../../constants';

import './CreatePage.scss'

const web3 = require("@solana/web3.js");
const splToken = require('@solana/spl-token');
// import splToken from '@solana/spl-token'
// import { Connection } from '@metaplex/js'

const CreatePage = () => {

    const history = useNavigate()
    const { pathname } = useLocation()

    const [contentTag, setContentTag] = useState('')
    const [step, setStep] = useState('')

    const createNFT = async () => {
        // Connect to cluster
        let connection = new web3.Connection(
            web3.clusterApiUrl("devnet"),
            'confirmed',
        );

        // Generate a new wallet keypair and airdrop SOL
        let fromWallet = web3.Keypair.generate();
        let fromAirdropSignature = await connection.requestAirdrop(
            fromWallet.publicKey,
            web3.LAMPORTS_PER_SOL,
        );
        //wait for airdrop confirmation
        await connection.confirmTransaction(fromAirdropSignature);

        //create new token mint
        let mint = await splToken.Token.createMint(
            connection,
            fromWallet,
            fromWallet.publicKey,
            null,
            9,
            splToken.TOKEN_PROGRAM_ID,
        );

        //get the token account of the fromWallet Solana address, if it does not exist, create it
        let fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
            fromWallet.publicKey,
        );

        let toWallet = web3.Keypair.generate();

        //get the token account of the toWallet Solana address, if it does not exist, create it
        let toTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
            toWallet.publicKey,
        );

        //minting 1 new token to the "fromTokenAccount" account we just returned/created
        await mint.mintTo(
            fromTokenAccount.address, //who it goes to
            fromWallet.publicKey, // minting authority
            [], // multisig
            1000000000, // how many
        );

        await mint.setAuthority(
            mint.publicKey,
            null,
            "MintTokens",
            fromWallet.publicKey,
            []
        )

        // Add token transfer instructions to transaction
        let transaction = new web3.Transaction().add(
            splToken.Token.createTransferInstruction(
                splToken.TOKEN_PROGRAM_ID,
                fromTokenAccount.address,
                toTokenAccount.address,
                fromWallet.publicKey,
                [],
                1,
            ),
        );

        // Sign transaction, broadcast, and confirm
        let signature = await web3.sendAndConfirmTransaction(
            connection,
            transaction,
            [fromWallet],
            { commitment: 'confirmed' },
        );
        console.log('SIGNATURE', signature);
    }

    const createNFTPage = (contentTag) => {
        if (contentTag === 'SINGLE') {
            return <SingleNft step={step} setStep={setStep} />
        } else if (contentTag === 'MULTIPLE') {
            return <div>MULTIPLE</div>
        }
    }

    useEffect(async () => {
        setStep(pathname.split('/')[2])
        console.log(pathname.split('/')[2])
    }, [pathname])

    return (
        <div className='createPage'>
            <div onClick={() => history({ pathname: homepage })} className="back">
                <span>BACK</span>
            </div>
            <div className="createPage__stepper">
                <Stepper step={step} />
            </div>

            <div className="createPage__infoblock">
                {
                    step === '0' && contentTag === ''
                        ? <>
                            <div className="blockDesc">
                                Easily create an NFT with Metaplex standard that can be traded on any NFT marketplace.
                        <div>How do you want to create your NFT?</div>
                            </div>

                            <div className="blockBtns">
                                <div onClick={() => {
                                    setContentTag('SINGLE')
                                    history({ pathname: `${createpage}/1` })
                                }} className="gitBook">
                                    SINGLE
                    </div>
                                <div onClick={() => {
                                    setContentTag('MULTIPLE')
                                    history({ pathname: `${createpage}/1` })
                                    console.log('MULTIPLE')
                                }} className="gitBook">
                                    MULTIPLE
                    </div>
                            </div>
                        </>
                        : createNFTPage(contentTag)
                }

            </div>

        </div>
    )
}

export default CreatePage
