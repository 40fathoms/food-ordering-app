import React from 'react'
import ReactDOM from 'react-dom'

const Backdrop = props => {
    return <div className="backdrop" onClick={props.handleCart}></div>
}

const ModalOverlay = props => {
    return (
        <div className="modal">
            <div className="content">{props.children}</div>
        </div>
    )
}

const portal = document.getElementById("overlays")

const Modal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop handleCart={props.handleCart} />, portal)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portal)}
        </React.Fragment>
    )
}

export default Modal