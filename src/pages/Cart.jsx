import {useContext, useEffect, useState, useRef, Fragment} from 'react'
import {AppContext} from "../components/AppContextProvider.jsx";
import CartItem from "../components/CartItem.jsx";

function Cart(props) {
    const app = useContext(AppContext)
    const [orderButton, setOrderButton] = useState("Place Order")

    const cartItemElements = app.cartItems.map(item => (
            <CartItem key={item.id} item={item} removeItem={ () => {
                app.removeCartItems(item.id)
                app.setCartFalse(item.id)
            }} />
        )
    )

    const totalPrices = app.cartItems.length > 0 ? app.cartItems.reduce((total, currentValue) => {
        return total + currentValue.price
    }, 0) : 0 ;

    function placeOrder() {
        setOrderButton("Ordering...")
        setTimeout(() => {
            setOrderButton("Place Order")
            //reset cart items to nothing
            app.setCartItems([])
            //set all photos, to have carted: false, because cart is empty now
            app.setPhotos(prev => {
               return prev.map(item => {
                    return {...item, carted: false}
                })
            })
            console.log("order placed!")
        }, 3000)

    }

    return (
        <main className="cart-page">
            <h1>checkout</h1>
            {cartItemElements}
            <p className="total-cost"> {`Total: ${totalPrices.toLocaleString("en-US", {style:"currency", currency:"USD"})}`}</p>
            <div className="order-button">
                {app.cartItems.length > 0 ? <button onClick={placeOrder}>{orderButton}</button> : <p>cart is empty</p>}
            </div>
        </main>
    )
}

export default Cart
