import {Link} from "react-router-dom";
import {useContext} from "react";
import {AppContext} from "./AppContextProvider.jsx";

function Header(props) {
    const cartLogo = new URL('/public/shopping-cart-2-line.svg', import.meta.url).href;
    const cartFilledLogo = new URL('/public/shopping-cart-2-fill.svg', import.meta.url).href;

    const app = useContext(AppContext)

    return (
        <header>
            <Link to={"/"}><h2>Pic some</h2></Link>
            <Link to={"/cart"}><img id={"cart-logo"} src={app.cartItems.length === 0 ? cartLogo : cartFilledLogo} alt=""/></Link>

        </header>
    )
}

export default Header
