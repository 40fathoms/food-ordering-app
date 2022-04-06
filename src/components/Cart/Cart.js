import React from 'react'
import Modal from '../UI/Modal'

import CartContext from '../../store/CartContext'
import CartItem from './CartItem'

const Cart = (props) => {

    const cartContext = React.useContext(CartContext)

    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`

    const hasItems = cartContext.items.length > 0

    const cartItemAddHandler = (item) => {
        cartContext.addItem({...item, amount:1})
    }

    const cartItemRemoveHandler = (id) => {
        cartContext.removeItem(id)
    }

    return (
        <Modal handleCart={props.handleCart}>

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

            <div className="actions">
                <button className="button-alt" onClick={props.handleCart}>Close</button>
                {hasItems && <button className="button">Order</button>}
            </div>

        </Modal>
    )
}

export default Cart