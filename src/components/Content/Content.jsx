import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionAuth } from '../../redux/reducers/userReducer'
import { Route, Routes, useLocation, useNavigate } from 'react-router'
import './Content.scss'
import CreatePage from '../../Pages/CreatePage/CreatePage'
import MyNFT from '../../Pages/MyNFT/MyNFT'

const Content = () => {

    const {auth} = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('tokenSol')) {
            dispatch(actionAuth(true))
        } else {
            dispatch(actionAuth(false))
        }
    }, [])

    return (
        <div className='page-content__main'>
            { auth 
            ? <Routes>
                <Route path='/' element={<MyNFT />} />
                <Route path='/create' element={<CreatePage />} />
            </Routes> 
            : 'Please connect your wallet'}
        </div>
    )
}

export default Content
