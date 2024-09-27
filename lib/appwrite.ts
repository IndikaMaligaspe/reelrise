import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const appWriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.im-devlabs.reelrise',
    projectId:`${process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID}`,
    databaseId:`${process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID}`,
    userCollectionId:'66f21544001e651b8bb1',
    videoCollectionId:'66f2158d001cae5da7f0',
    sorageId:'66f216de0035dba2c865',
}

console.log("---appWriteConfig--", appWriteConfig);

const { endpoint, platform,projectId,databaseId,userCollectionId,videoCollectionId,sorageId } = appWriteConfig;

// Init your React Native SDK
const client = new Client();


client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
    .setPlatform(platform) // Your application ID or bundle ID.
;


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
export const createUser = async (email: string, password: string, userName:string) => {
    try 
    {
        const id = ID.unique();
        const newAccount = await account.create(id, email, password, userName);
        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(userName);
        const session = await signIn(email, password);
        const newUser = await databases.createDocument(
            databaseId,
            userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username:userName,
                avatar:avatarUrl
            }
        );
        return newUser;
    } catch (err) {
        console.log(err);
        throw new Error((err as Error).message);
    }
}

export const signIn = async (email:string, password: string) => {
    try{
        console.log('EMAIL- PW', email, password)
        // let  session = await account.getSession('current')
        // if(!session)
        const session = await account.createEmailPasswordSession(email, password);
        console.log('Session', session)
        if(!session) throw new Error()
        return session;    
    } catch (err) {
        console.log(err);
        throw new Error((err as Error).message);
    }
}

export const getCurrentUser = async () =>{
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
                databaseId, 
                userCollectionId, 
                [Query.equal('accountId', currentAccount.$id)]);
        
        if(!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (err) {
        console.log(err)
        throw new Error((err as Error).message);
    }
}


export const getAllPosts = async () =>{
    try{
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
        )
        return posts.documents;
    } catch (err) {
        console.log(err)
        throw new Error((err as Error).message)
    }
}

export const getLatestPosts = async () =>{
    try{
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(7)
            ]
        )
        return posts.documents;
    } catch (err) {
        console.log(err)
        throw new Error((err as Error).message)
    }
}

export const searchPosts = async (query:string | string[]) =>{
    try{
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [
                Query.orderDesc('$createdAt'),
                Query.contains('title',query),
                Query.limit(7)
            ]
        )
        return posts.documents;
    } catch (err) {
        console.log(err)
        throw new Error((err as Error).message)
    }
}

export const getUserPosts = async (userId:string) =>{
    try{
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [
                Query.orderDesc('$createdAt'),
                Query.equal('creator',userId),
                Query.limit(7)
            ]
        )
        return posts.documents;
    } catch (err) {
        console.log(err)
        throw new Error((err as Error).message)
    }
}

export const signOut = async () => {
    try{
        let  session = await account.deleteSession('current')
        return session;    
    } catch (err) {
        console.log(err);
        throw new Error((err as Error).message);
    }
}
