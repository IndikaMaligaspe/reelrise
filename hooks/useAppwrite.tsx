import { getAllPosts } from "@/lib/appwrite";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Models } from "react-native-appwrite";

type callBackType = (a?:any) => any;

const useAppWrite = (fn:callBackType) =>{
    const [data, setData] = useState<Models.Document[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try{
            const response = await fn();
            setData(response);
        } catch (err) {
            Alert.alert('Error', (err as Error).message);
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(() =>{
        fetchData();
    },[]);

    const refetch = () => fetchData();

  return { data, isLoading, refetch }
}

export default useAppWrite;