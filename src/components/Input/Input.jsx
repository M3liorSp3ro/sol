import React, { useEffect, useState } from 'react'
import './Input.scss'

const Input = ({ title, value, onChange, placeholder, onlyNum, moreArea, id, dopFunc }) => {

    const [noChangeInput, setNoChangeInput] = useState(null)

    const addresesFunc = (id, percent) => {
        // console.log('id', id);
        // console.log('percent', percent);
        if (/^[\d.,:]*$/.test(percent)) {
            setNoChangeInput(percent)
        }
    }

    useEffect(() => {
        // console.log('noChangeInput', noChangeInput);
        if (noChangeInput) {
            dopFunc(id, noChangeInput)
        }
    }, [noChangeInput])

    return (
        <label className='customInput'>
            <input
                value={value}
                onChange={(e) => {
                    if (onlyNum) {
                        if (/^[\d.,:]*$/.test(e.target.value)) {
                            onChange(e.target.value)
                        }
                    } else if (moreArea) {
                        addresesFunc(id, e.target.value)
                    } else {
                        onChange(e.target.value)
                    }

                }}
                required type="text"
                placeholder={placeholder ? placeholder : ''}
            />
            <span className='placeholder'>{title}</span>
        </label>
    )
}

export default Input
