import React from 'react'
import './Input.scss'

const Input = ({title, value, onChange}) => {
    return (
        <label className='customInput'>
            <input value={value} onChange={(e) => onChange(e.target.value)} required type="text"/>
            <span className='placeholder'>{title}</span>
        </label>
    )
}

export default Input
