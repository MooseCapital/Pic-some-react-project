import {Link} from "react-router-dom";

function Header(props) {
    const cartLogo = new URL('/public/shopping-cart-2-line.svg', import.meta.url).href

    return (
        <header>
            <Link to={"/"}><h2>Pic some</h2></Link>
            <Link to={"/cart"}><img id={"cart-logo"} src={cartLogo} alt=""/></Link>

        </header>
    )
}

export default Header
