import {initializeApp} from 'firebase/app';
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc,
    updateDoc,
    deleteDoc,
    collection,
    // writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot
} from 'firebase/firestore';

import { CreateAuthDocumentFromSessionProps, AuthDoc } from './firebase.types'


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
initializeApp(firebaseConfig);

const db = getFirestore()

export const createAuthDocumentFromSession = async (
    sessionData: CreateAuthDocumentFromSessionProps
): Promise<void | QueryDocumentSnapshot<AuthDoc>> => {
    const authDocRef = doc(db, 'auth', sessionData.session)
    const authSnapshot = await getDoc(authDocRef)

    if (!authSnapshot.exists()) {
        const { session, state, codeVerifier } = sessionData
        const createdAt = new Date()
        try {
            await setDoc(authDocRef, {
                authSession : session,
                state, 
                codeVerifier,
                createdAt
            })
        } catch(error) {
            console.log('error creating auth doc ', error)
        }
    }
}

export const getAuthDoc = async (authSession: string): Promise<AuthDoc> => {
    const collectionRef = collection(db, 'auth')
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q)
    const snapshotDocs = querySnapshot.docs.map((doc) => doc.data() as AuthDoc).filter((doc) => doc.authSession === authSession)
    return snapshotDocs[0]
}

export type UpdateAuthDocProps = {
    authSession: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
    expires_at: number;
}

export const updateAuthDoc = async (updateAuthDocProps: UpdateAuthDocProps ) => {
    const {authSession, access_token, expires_in, refresh_token, expires_at} = updateAuthDocProps
    const sessionRef = doc(db, 'auth', authSession)
    await updateDoc(sessionRef, {
        accessToken: access_token,
        expires_in, 
        refresh_token, 
        expires_at
    })
    return sessionRef
}

export const deleteAuthDocumentFromSession = async (session: string) => {
    await deleteDoc(doc(db, "auth", session));    
}

// module.exports = { createAuthDocumentFromSession, getAuthDoc, updateAuthDoc, deleteAuthDocumentFromSession }