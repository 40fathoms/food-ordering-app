import React from 'react'
import CartContext from '../../store/CartContext'

import CartIcon from '../Cart/CartIcon'

const HeaderCartButton = (props) => {

    const cartContext = React.useContext(CartContext)

    console.log(cartContext)
    
    const numberOfCartItems = cartContext.items.reduce((curNumber, item)=>{
        return curNumber + item.amount
    }, 0)


    // animation when an item is added to the cart
    const [btnHighlighted, setBtnHighlighted] = React.useState(false)

    const btnClasses = `button ${btnHighlighted ? 'bump' : '' }`

    React.useEffect(()=>{
        if(cartContext.items.length === 0){
            return
        }

        setBtnHighlighted(true)

        const timer = setTimeout(()=>{setBtnHighlighted(false)}, 300)

        // cleanup function
        return () => {
            clearTimeout(timer)
        }

    }, [cartContext.items])

    return (
        <button
            onClick={props.onClick}
            className={btnClasses}
        >

            <span className="icon">
                <CartIcon />
            </span>
            
            <span>
                Your Cart
            </span>
            
            <span className="badge">
                {numberOfCartItems}
            </span>

        </button>
    )
}

export default HeaderCartButton