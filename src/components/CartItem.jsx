import {useContext, useEffect, useState, useRef} from 'react'

function CartItem(props) {

    const trashLine = new URL('/public/delete-bin-line.svg', import.meta.url).href
    const trashFill = new URL('/public/delete-bin-fill.svg', import.meta.url).href

    const [hovered, setHovered] = useState(false)
    return (
        <div className="cart-item">
            <img onClick={props.removeItem} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={"ri-delete-bin-line"}
            src={hovered ? trashFill : trashLine} alt=""/>
            <img className={"product-image-cart"} src={props.item.download_url} width={"130px"} alt=""/>
            <p>{props.item.price.toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>
        </div>
    )
}
//props.price.toLocaleString("en-US", {style:"currency", currency:"USD"})
export default CartItem
