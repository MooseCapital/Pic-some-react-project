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
            <Image toggleFavorite={() => app.toggleFavorite(item.id)}  key={item.id} img={item}  class={getClass(index)}
                handleCart={() => {
                    if (item.carted) {
                        app.removeCartItems(item.id)
                        app.toggleCarted(item.id)
                    } else {
                        app.addCartItems(item)
                        app.toggleCarted(item.id)
                    }
                 }
                }
            />
        )
    })

    return (
        <main className="photos">


            {photoElements}
            {app.loader && <img className={"loader-gif"}  src={loader} alt=""/>}
        </main>
    )
}

export default Photos
