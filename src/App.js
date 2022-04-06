import React from 'react'

import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {

  const [cartIsShown, setCartIsShown] = React.useState(false)

  const handleCart = () => {
    setCartIsShown(shown => !shown)
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart handleCart={handleCart} />}
      <Header handleCart={handleCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;