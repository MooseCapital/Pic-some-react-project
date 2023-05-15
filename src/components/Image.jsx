import {useState} from "react";

const heartImg = new URL('/public/heart-fill.svg', import.meta.url).href
const addImg = new URL('/public/add-circle-fill.svg', import.meta.url).href

function Image(props) {
    const [hovered, setHovered] = useState(false)

    return (
        <div className={`${props.class} image-container`}>
            <img
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            src={props.img.download_url} className={"image-grid"} alt=""/>
            { (hovered || props.img.favorite) && <img onMouseEnter={() => setHovered(true)} onClick={props.toggleFavorite}  src={heartImg} className={"favorite"} alt=""/> }
            { hovered && <img onMouseEnter={() => setHovered(true)} src={addImg} className={"cart"} alt=""/> }


        </div>
    )
}

export default Image
