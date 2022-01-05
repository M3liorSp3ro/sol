import React from 'react'
import './Stepper.scss'

const Stepper = ({step}) => {

    const steps = ['Category', 'Upload', 'Info', 'Royalties', 'Launch']

    return (
        <div className='stepper'>
            {steps.map((el, i) => {
                return (
                    <div className="stepper__item">
                        <div className={step !== 0 && i < step ? "stepper__item_circle step" : "stepper__item_circle"} />
                        <div className="stepper__item_text">{el}</div>
                    </div>
                )
            })}

        </div>
    )
}

export default Stepper
