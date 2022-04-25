import React from 'react'

const Checkout = (props) => {

    const [formValidity, setFormValidity] = React.useState({
        name:true,
        street:true,
        postal:true,
        city:true
    })

    const nameInputRef = React.useRef()
    const streetInputRef = React.useRef()
    const postalInputRef = React.useRef()
    const cityInputRef = React.useRef()

    const isEmpty = value => value.trim() === ''
    const isFiveChars = value => value.trim().length === 5

    const confirmHandler = e => {
        e.preventDefault()

        const enteredName = nameInputRef.current.value
        const enteredStreet = streetInputRef.current.value
        const enteredPostal = postalInputRef.current.value
        const enteredCity = cityInputRef.current.value

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredPostalIsValid = isFiveChars(enteredPostal)
        const enteredCityIsValid = !isEmpty(enteredCity)

        setFormValidity({
            name:enteredNameIsValid,
            street:enteredStreetIsValid,
            postal:enteredPostalIsValid,
            city:enteredCityIsValid
        })

        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredPostalIsValid &&
            enteredCityIsValid

        if (!formIsValid) {
            return
        }

        props.submitOrderHandler({
            name:enteredName,
            street:enteredStreet,
            postal:enteredPostal,
            city:enteredCity
        })

    }

    return (
        <form onSubmit={confirmHandler} className="checkout">

            <div className={`checkout-control ${!formValidity.name && 'invalid'}`}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id='name' ref={nameInputRef} />
                {!formValidity.name && <p>Please enter a valid name.</p>}
            </div>

            <div className={`checkout-control ${!formValidity.street && 'invalid'}`}>
                <label htmlFor="street">Street</label>
                <input type="text" id='street' ref={streetInputRef} />
                {!formValidity.street && <p>Please enter a valid street.</p>}
            </div>

            <div className={`checkout-control ${!formValidity.postal && 'invalid'}`}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id='postal' ref={postalInputRef} />
                {!formValidity.postal && <p>Please enter a valid postal code (5 characters).</p>}
            </div>

            <div className={`checkout-control ${!formValidity.city && 'invalid'}`}>
                <label htmlFor="city">City</label>
                <input type="text" id='city' ref={cityInputRef} />
                {!formValidity.city && <p>Please enter a valid city.</p>}
            </div>

            <div className="checkout-actions">
                <button type="button" onClick={props.handleCart} >Cancel</button>
                <button className="submit">Confirm</button>
            </div>

        </form>
    )
}

export default Checkout