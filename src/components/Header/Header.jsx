
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { actionAuth } from '../../redux/reducers/userReducer'
import Modal from '../Modal/Modal'
import './Header.scss'

import phantomLogo from '../../asset/phantom-logo.svg'
import solflare from '../../asset/solflare-logo.svg'
import { toast } from 'react-toastify'

const Header = () => {

    const [modalActive, setModalActive] = useState(false)
    const [whatProvider, setWhatProvider] = useState('')

    const dispatch = useDispatch()
    const { auth } = useSelector(state => state.user)

    const history = useNavigate()

    const wallets = [
        {
            logo: phantomLogo,
            title: 'Phantom',
            funcActive: () => getProviderPhantom()
        },
        {
            logo: solflare,
            title: 'Solfare',
            funcActive: () => getProviderSolflare()
        },
    ]

    const getProviderSolflare = async () => {
        try {
            if ('solflare' in window) {
                await window.solflare.connect()
                localStorage.setItem('walletSol', 'solflare')
                const provider = window.solflare;
                // console.log('ЗАШЛИИИИ', provider)
                if (provider.isSolflare) {

                    setWhatProvider('Solflare')
                    // console.log("Public key Solflare of the emitter: ", provider.publicKey.toString());
                    return provider;
                }
            } else {
                window.open('https://solflare.com', '_blank');
            }
        } catch (ex) {
            console.log(ex)
            toast.error('Ошибка подключения к кошельку')
        }

    }

    const getProviderPhantom = async () => {
        try {
            if ("solana" in window) {

                // opens wallet to connect to
                await window.solana.connect();
                localStorage.setItem('walletSol', 'phantom')

                const provider = window.solana;
                if (provider.isPhantom) {
                    console.log("Is Phantom installed?  ", provider.isPhantom);
                    setWhatProvider('Phantom')
                    return provider;
                }
            } else {
                window.open("https://www.phantom.app/", "_blank");
            }
        } catch (ex) {
            console.log(ex)
            toast.error('Ошибка подключения к кошельку')
        }
    };


    const disconnectWallet = () => {
        if(localStorage.getItem('walletSol') === 'phantom') {
            toast('Disconnect Phantom')
            window.solana.disconnect();
        } else if(localStorage.getItem('walletSol') === 'solflare') {
            toast('Disconnect Solflare')
            window.solflare.disconnect();
        }
        localStorage.removeItem('tokenSol')
        dispatch(actionAuth(false))
        history({ pathname: '/' })
        setWhatProvider('')
        // toast('Вы отключились от кошелька')
        // console.log(window.solflare);
    }

    // useEffect(() => {
    //     // Will either automatically connect to Phantom, or do nothing.
    //     window.solana?.connect({ onlyIfTrusted: true })
    //         .then(({ publicKey }) => {
    //             console.log('Successeful connect', publicKey.toString())
    //             localStorage.setItem('tokenSol', publicKey.toString())
    //             dispatch(actionAuth(true))
    //         })
    //         .catch((e) => {
    //             // Handle connection failure as usual
    //             console.log(e);
    //         })
    // }, []);


    useEffect(async () => {
        if (whatProvider === 'Phantom') {
            var provider = await getProviderPhantom();
            console.log("Public key Phantom of the emitter: ", provider.publicKey.toString());
            localStorage.setItem('tokenSol', provider.publicKey.toString())
            dispatch(actionAuth(true))
            toast('Вы подключились к Phantom Wallet')
        } else if (whatProvider === 'Solflare') {
            var provider = await getProviderSolflare();
            console.log("Public key Solflare of the emitter: ", provider.publicKey.toString());
            localStorage.setItem('tokenSol', provider.publicKey.toString())
            dispatch(actionAuth(true))
            toast('Вы подключились к Solflare')
        }
        setModalActive(false)
    }, [whatProvider])

    return (
        <>
            <Modal active={modalActive} setActive={setModalActive}>
                <div className="wallets">
                    {wallets.map((el, i) => {
                        return (
                            <div key={i} onClick={() => el.funcActive()} className="wallets__item">
                                <div className="wallets__item_left">
                                    <img src={el.logo} alt="logo" />
                                </div>
                                <div className="wallets__item_right">
                                    {el.title}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Modal>
            <header className="page-content__header">
                <div className="logo">logo</div>

                <div className='userAndWallet'>
                    <div className="page-content__header-right">
                        <div onClick={() => {
                            auth
                                ? disconnectWallet()
                                : setModalActive(true)
                        }} className="gitBook">
                            {auth ? 'Disconnect wallet' : 'Connect wallet'}
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
