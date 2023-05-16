import {useState, createContext, useEffect} from "react";

const AppContext = createContext({})
function AppContextProvider(props) {
    const [photos, setPhotos] = useState([])
    const [loader, setLoader] = useState(true)
    const [cartItems, setCartItems] = useState([])

//we can get favorite photos from local storage by default photos state grabbing from storage, now below in fetch,
    //we could say if(subscribed && !localStorage.prop) -> so if the localstorage is empty, as in the first time visiting, we fetch!
    //if it's not empty, then they already fetched, and possibly have favorite items, no need to setPhotos from the current data
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
                    favorite: false,
                    carted: false,
                    price: 5.99,
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
    function toggleCarted(id) {
        setPhotos(prevPhotos => {
            return prevPhotos.map(img => {

                return id === img.id ? {...img, carted: !img.carted} : {...img}
            })
        })
        setCartItems(prevCart => {
            return prevCart.map(img => {
                return img.id === id ? {...img, carted: !img.carted} : {...img}
            })
        })
    }

    function removeCartItems(id) {
        setCartItems(prev => {
            return prev.filter(img => {
                return img.id !== id;
            })
        })
    }

    function addCartItems(img) {
        setCartItems(prev => {
            if (prev.length === 0) {
                return [...prev, img]
            } else if ((!prev.find(item => item.id === img.id))) {
                return [...prev, img]
            }
            return prev;
        })
    }
    console.log(cartItems)

    return (
        <AppContext.Provider value={{ photos, setPhotos, loader, setLoader, toggleFavorite, cartItems, addCartItems, toggleCarted, removeCartItems}}>
            {props.children}
        </AppContext.Provider>
    )
}

export {AppContextProvider, AppContext}
