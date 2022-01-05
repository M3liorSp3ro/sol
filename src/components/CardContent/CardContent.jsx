import React from 'react'

const CardContent = ({ title, children }) => {
    return (
        <div className='cardContent'>
            <div className="cardContent__body">
                {/* <div className="cardContent__body_title">{title}</div> */}
                {children}
            </div>
        </div>
    )
}

export default CardContent
