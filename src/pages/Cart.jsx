import {useContext, useEffect, useState, useRef, Fragment} from 'react'
import {AppContext} from "../components/AppContextProvider.jsx";
import CartItem from "../components/CartItem.jsx";

function Cart(props) {
    const app = useContext(AppContext)

    const cartItemElements = app.cartItems.map(item => (
            <CartItem key={item.id} item={item} removeItem={ () => {
                app.removeCartItems(item.id)
                app.toggleCarted(item.id)
            }} />
        )
    )

    const totalPrices = app.cartItems.length > 0 ? app.cartItems.reduce((total, currentValue) => {
        return total + currentValue.price
    }, 0) : 0 ;


    console.log(totalPrices)
    return (
        <main className="cart-page">
            <h1>checkout</h1>
            {cartItemElements}
            <p className="total-cost"> {`Total: ${totalPrices.toLocaleString("en-US", {style:"currency", currency:"USD"})}`}</p>
            <div className="order-button">
                <button>Place order</button>
            </div>
        </main>
    )
}

export default Cart
