import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useContext, useState, useEffect } from "react";
import { Models } from "react-native-appwrite";
import { GlobalContextType } from "./types.context";


const GlobalContext = createContext<GlobalContextType | unknown>({});

export const useGlobalContext = () => useContext<GlobalContextType | unknown>(GlobalContext);

export const GlobalProvider = ({children}: {children:React.ReactNode}) =>{
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState<Models.Document|null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() =>{
        getCurrentUser().then((res) =>{
          if(res){
              setIsLoggedIn(true);
              setCurrentUser(res)
          } else {
              setIsLoggedIn(false);
              setCurrentUser(null)
          }
        }).catch((err) => {
          console.log(err);
        }).finally(()=>{
          setIsLoading(false);
        })
      },[])

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                currentUser,
                isLoading,
                setIsLoggedIn,
                setCurrentUser,
            }}
        >
            {children}
        </GlobalContext.Provider>

    )
}


