import {useContext, useEffect} from "react";
import App from "../App.jsx";
import {AppContext} from "../components/AppContextProvider.jsx";
import Image from "../components/Image.jsx";
import {getClass} from "../data/Utils.js";

const loader = new URL('/public/loading.gif', import.meta.url).href

function Photos(props) {




    const app = useContext(AppContext)


    const photoElements = app.photos.map((item, index) => {

        return (
            <Image key={item.id} img={item} url={item.download_url} class={getClass(index)}/>
        )
    })

    console.log(app.photos)
    return (
        <div className="photos-page">


            {/* {photoElements} */}
            {app.loader && <img className={"loader-gif"} src={loader} alt=""/>}
        </div>
    )
}

export default Photos
