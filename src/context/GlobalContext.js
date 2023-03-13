import React, { useContext, useState, createContext } from "react";

// create context

const globalContext = createContext();

// create context hook
export const useGlobalContext = () => useContext(globalContext);

// create provider
export const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    return (
        <globalContext.Provider value={
            {
                user,
                setUser,
                token,
                setToken
            }
        }>
        {children}
        </globalContext.Provider>
    );
    };
