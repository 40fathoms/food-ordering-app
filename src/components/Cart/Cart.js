import React from 'react'
import Modal from '../UI/Modal'

import CartContext from '../../store/CartContext'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = (props) => {

    const [isCheckout, setIsCheckout] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [didSubmit, setDidSubmit] = React.useState(false)

    const cartContext = React.useContext(CartContext)

    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`

    const hasItems = cartContext.items.length > 0

    const cartItemAddHandler = (item) => {
        cartContext.addItem({ ...item, amount: 1 })
    }

    const cartItemRemoveHandler = (id) => {
        cartContext.removeItem(id)
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)

        const response = await fetch('https://max-food-app-278de-default-rtdb.firebaseio.com/order.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartContext.items
            })
        })

        setIsSubmitting(false)
        setDidSubmit(true)

        cartContext.clearCart()
    }


    const modalActions = (
        <div className="actions">
            <button className="button-alt" onClick={props.handleCart}>Close</button>
            {hasItems && <button className="button" onClick={orderHandler}>Order</button>}
        </div>
    )

    const cartModalContent = (
        <React.Fragment>
            <ul className='cart-items'>

                {cartContext.items.map(item => {
                    return (
                        <CartItem
                            key={item.id}
                            name={item.name}
                            amount={item.amount}
                            price={item.price}

                            onAdd={cartItemAddHandler.bind(null, item)}
                            onRemove={cartItemRemoveHandler.bind(null, item.id)}
                        />
                    )
                })}

            </ul>

            <div className='total'>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>

            {isCheckout &&
                <Checkout
                    handleCart={props.handleCart}
                    submitOrderHandler={submitOrderHandler}
                />
            }

            {!isCheckout && modalActions}
        </React.Fragment>
    )

    const isSubmittingModalContent = <p>Sending order data...</p>

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <button className="button" onClick={props.handleCart}>Close</button>
        </React.Fragment>
    )

    return (
        <Modal handleCart={props.handleCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {didSubmit && !isSubmitting && didSubmitModalContent}
        </Modal>
    )
}

export default Cart