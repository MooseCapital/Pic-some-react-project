import {useContext, useEffect, useState, useRef, Fragment} from 'react'
import {AppContext} from "../components/AppContextProvider.jsx";

function Cart(props) {
    const app = useContext(AppContext)

    const cartItemElements = app.cartItems.map(item => (
            <Fragment  key={item.id}>
                <h3>{item.author}</h3>
            </Fragment>
        )
    )

    return (
        <main className="cart-page">
            <h1>checkout</h1>
            {cartItemElements}
        </main>
    )
}

export default Cart
