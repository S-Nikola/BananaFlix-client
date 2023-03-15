import React, { useContext, useState, createContext } from "react";

// create context

const globalContext = createContext();

// create context hook
export const useGlobalContext = () => useContext(globalContext);

// create provider
export const GlobalProvider = ({ children }) => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

    const [user, setUser] = useState(storedUser || null);
    const [token, setToken] = useState(storedToken || null);

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