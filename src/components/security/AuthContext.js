import { createContext, useContext, useState } from "react";

// Creating a context
export const AuthContext = createContext()

//using context to insert security into childComponents
export const useAuth = () => useContext(AuthContext);

// Authentication checker
export default function AuthProvider({children}){
    const [isAuthenticated,setAuthenticated] = useState(false)

    const [username,setUsername] = useState(null)

    function login(username,password){
        if(username === 'admin' && password === 'admin'){
            setUsername(username) //setting the username across the application shared via context
            setAuthenticated(true) // AUTHENTICATED
            return true
        }else{
            setAuthenticated(false)
            return false
        }
    }

    function logout(){
        setAuthenticated(false);
    }

    //passing it as an object to its child
    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout,username}}>
            {children}
        </AuthContext.Provider>
    )
}