import React from 'react'
import CartContext from '../../store/CartContext'
import MealItemForm from './MealItemForm'

const MealItem = (props) => {

    const cartContext = React.useContext(CartContext)

    const addToCartHandler = amount => {
        cartContext.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    }

    return (
        <li className="meal">
            <div>
                <h3>{props.name}</h3>
                <p className='description'>{props.description}</p>
                <p className='price'>$ {props.price.toFixed(2)}</p>
            </div>

            <MealItemForm id={props.id} addToCartHandler={addToCartHandler} />
        </li>
    )
}

export default MealItem