import {useState, createContext, useEffect} from "react";

const AppContext = createContext({})
function AppContextProvider(props) {
    const [photos, setPhotos] = useState([])
    const [loader, setLoader] = useState(true)


    useEffect(() => {
            let subscribed = true;
            async function getData() {
                  let res = await fetch("https://picsum.photos/v2/list?page=4&limit=100");
                  let data = await res.json();
                  if (subscribed) {
                    setPhotos(prevState => {
                        data.length = 10;
                        return data
                    })
                    setLoader(false)
                    addFavorites();
                 }
             }
            getData()
            return () => {
                //console.log("cancelled")
                subscribed = false;
                setLoader(true)
            }
    }, [])

    function addFavorites() {
        setPhotos(prev => {
            return prev.map(img => {
                return {
                    ...img,
                    favorite: false
                }
            })
        })
    }

   function toggleFavorite(id) {
        setPhotos(prevPhotos => {
            return prevPhotos.map(img => {
                return id === img.id ? {...img, favorite: !img.favorite} : {...img}
            })
        })
    }

    return (
        <AppContext.Provider value={{ photos, setPhotos, loader, setLoader, toggleFavorite}}>
            {props.children}
        </AppContext.Provider>
    )
}

export {AppContextProvider, AppContext}
