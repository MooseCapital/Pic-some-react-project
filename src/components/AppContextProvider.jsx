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
                 }
             }
            getData()
            return () => {
                //console.log("cancelled")
                subscribed = false;
                setLoader(true)
            }
    }, [])

    return (
        <AppContext.Provider value={{ photos, setPhotos, loader, setLoader}}>
            {props.children}
        </AppContext.Provider>
    )
}

export {AppContextProvider, AppContext}
