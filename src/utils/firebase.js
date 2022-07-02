import { initializeApp } from "firebase/app";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6DyFmuQFs__IHI76tsrLQvdDsDgCziRs",
  authDomain: "spotify-auth-90412.firebaseapp.com",
  projectId: "spotify-auth-90412",
  storageBucket: "spotify-auth-90412.appspot.com",
  messagingSenderId: "898491969892",
  appId: "1:898491969892:web:d6c02746041c03b4808a71"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore()

export const getUserDocRef = (userAuth) => {
    return doc(db, 'users', userAuth.id)
}

export const getUserSnapshot = async (userDocRef) => {
    const userSnapshot = await getDoc(userDocRef)
    return userSnapshot
}

export const isNewUser = async (userDocRef) => {
    const userSnapshot = await getUserSnapshot(userDocRef)
    return userSnapshot.data().name === undefined
}

export const setName = async (user, name) => {
    const userDocRef = getUserDocRef(user)
    try {
        await setDoc(userDocRef, {
        name,
        },
        {
            merge: true
        })
    } catch(error) {
        console.log('error adding name to document', error)
    }
    return userDocRef
}

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = getUserDocRef(userAuth)

    const userSnapshot = await getUserSnapshot(userDocRef)

    if (!userSnapshot.exists()) {
        const { display_name, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName: display_name, 
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user', error)
        }
    }

    return userDocRef
}

export const getAuthDocRef = (authSession) => {
    return doc(db, 'oAuth', authSession)
}

export const getAuthClientId = async () => {
    const authDocRef =  getAuthDocRef()
    const authSnapshot = await getDoc(authDocRef)
    console.log(authSnapshot.data()['client-id'])
    return authSnapshot.data()['client-id']
}

export const getAuthAccessToken = async (authSession) => {
    const authDocRef =  getAuthDocRef(authSession)
    const authSnapshot = await getDoc(authDocRef)
    return authSnapshot.data()['accessToken']
}

export const createAuthDocumentFromSpotify = async (authInstance, accessToken) => {
    const authDocRef = getAuthDocRef(authInstance)
    try {
        await setDoc(authDocRef, {
        accessToken,
        },
        // {
            // merge: true
        // }
        )
    } catch(error) {
        console.log('error adding access token to document', error)
    }
    return authDocRef
}

// export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    // const collectionRef = collection(db, collectionKey)
    // const batch = writeBatch(db)
// 
    // objectsToAdd.forEach((object) => {
        // const docRef = doc(collectionRef, object.title.toLowerCase())
        // batch.set(docRef, object)
    // })
    // await batch.commit()
    // console.log('done')
// }
// 
// export const getCategoriesAndDocuments = async () => {
    // const collectionRef = collection(db, 'categories')
    // const q = query(collectionRef)
// 
    // const querySnapshot = await getDocs(q)
    // return querySnapshot.docs.map((docSnapshot) => docSnapshot.data())
// }

