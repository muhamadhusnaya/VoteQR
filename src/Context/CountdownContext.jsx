import { createContext, useState } from "react";


export const CountdownContext = createContext();

export const CountdownContextProvider = ({children}) => {
    const [isExpired, setIsExpired] = useState(undefined);

    return (
        <CountdownContext.Provider value={{ isExpired, setIsExpired }}>
            {children}
        </CountdownContext.Provider>
    )
}