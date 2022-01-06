import React from 'react'
import './Loader.scss'

const Loader = ({little}) => {
    return (
        <div className={little ? "lds-ring little" : "lds-ring"}><div></div><div></div><div></div><div></div></div>
    )
}

export default Loader
