import React from 'react'
import './Modal.scss'

const Modal = ({ active, setActive, children, className }) => {
    return (
        <div className={active ? `modal active` : `modal`} onClick={() => setActive(false)}>
            <div className={active ? `modal__content active ${className ? className : null}` : `modal__content ${className ? className : null}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal