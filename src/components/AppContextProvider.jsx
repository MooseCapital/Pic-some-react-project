import { useState, createContext} from "react";

const AppContext = createContext({})
function AppContextProvider(props) {

    const [mode, setMode] = useState(false)

    return (
        <AppContext.Provider value={{mode, setMode}}>
            {props.children}
        </AppContext.Provider>
    )
}

export {AppContextProvider, AppContext}
