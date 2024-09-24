import { Models } from "react-native-appwrite";

export type GlobalContextType = {
    isLoggedIn:boolean,
    setIsLoggedIn:(loggedIn:boolean) => void,
    currentUser:Models.Document | null,
    setCurrentUser:(user:Models.Document) => void,                
    isLoading: boolean
}