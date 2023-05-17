import {useState, createContext, useEffect} from "react";

const AppContext = createContext({})
function AppContextProvider(props) {
    const [photos, setPhotos] = useState(JSON.parse(localStorage.getItem("photos")) || [])
    const [loader, setLoader] = useState(true)
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")) || [])



    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems))

        return () => {

        }
    },[cartItems])

    useEffect(() => {
        localStorage.setItem("photos", JSON.stringify(photos))


        return () => {

        }
    },[photos])


    useEffect(() => {
            let subscribed = true;
            async function getData() {
                  let res = await fetch("https://picsum.photos/v2/list?page=4&limit=100");
                  let data = await res.json();
                  if (subscribed) {
                      setLoader(false)
                  }
                  if (subscribed && !JSON.parse(localStorage.getItem("photos")).length ) {
                    setPhotos(prevState => {
                        data.length = 20;
                        return data
                    })

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

    function setCartFalse(id) {
        setPhotos(prevPhotos => {
            return prevPhotos.map(img => {

                return id === img.id ? {...img, carted: false} : {...img}
            })
        })
        setCartItems(prevCart => {
            return prevCart.map(img => {
                return img.id === id ? {...img, carted: false} : {...img}
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
    console.log([...cartItems])

    return (
        <AppContext.Provider value={{ photos, setPhotos, loader, setLoader, toggleFavorite, cartItems, setCartItems , addCartItems, toggleCarted, removeCartItems, setCartFalse}}>
            {props.children}
        </AppContext.Provider>
    )
}

export {AppContextProvider, AppContext}
