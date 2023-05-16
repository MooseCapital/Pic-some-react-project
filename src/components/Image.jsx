import {useContext, useState} from "react";
import PropTypes from "prop-types";
import {AppContext} from "./AppContextProvider.jsx";

const heartImg = new URL('/public/heart-fill.svg', import.meta.url).href
const heartLineImg = new URL('/public/heart-line.svg', import.meta.url).href
const addImg = new URL('/public/add-circle-fill.svg', import.meta.url).href
const cartImg = new URL('/public/shopping-cart-2-line.svg', import.meta.url).href

function Image(props) {
    const app = useContext(AppContext)
    const [hovered, setHovered] = useState(false)


    return (
        <div className={`${props.class} image-container`} onMouseLeave={() => setHovered(false)}>
            <img
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            src={props.img.download_url} className={"image-grid"} alt=""/>
            { (hovered || props.img.favorite) && <img onMouseEnter={() => setHovered(true)}
            onClick={props.toggleFavorite}  src={props.img.favorite ? heartImg : heartLineImg} className={"favorite"} alt=""/> }

            { (hovered || props.img.carted) && <img onMouseEnter={() => setHovered(true)} src={props.img.carted ? cartImg : addImg} className={"cart"} alt=""
            onClick={props.handleCart} /> }


        </div>
    )
}

export default Image

Image.propTypes = {
class: PropTypes.string,
img: PropTypes.object,
toggleFavorite: PropTypes.func,

}
