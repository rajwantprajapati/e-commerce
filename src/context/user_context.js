import { createContext, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const value = {};
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext);