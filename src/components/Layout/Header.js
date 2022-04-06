import React from 'react'

import Meals from '../../assets/meals.jpg'

import HeaderCartButton from './HeaderCartButton'

const Header = (props) => {
  return (
    <>
        <header className='header'>
            <h1>ReactMeals</h1>
            <HeaderCartButton onClick={props.handleCart} />
        </header>

        <div className='main-image'>
            <img src={Meals} alt="meals background" />
        </div>
    </>
  )
}

export default Header