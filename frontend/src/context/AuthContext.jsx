import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
}


export const AuthContextProvider =({children}) => {
    const [authUser, setAuthUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("org-user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error('Error parsing auth user from localStorage', error);
            return null;
        }
    });

    useEffect(() => {
        // Update localStorage whenever authUser changes
        if (authUser) {
            localStorage.setItem("org-user", JSON.stringify(authUser));
        } else {
            localStorage.removeItem("org-user");
        }
    }, [authUser]);
    // const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("org-user")) || null)
    return <AuthContext.Provider value={{authUser,setAuthUser}}>
        {children}

    </AuthContext.Provider>
}