const {initializeApp} = require('firebase/app');
const { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc,
    updateDoc,
    deleteDoc,
    collection,
    // writeBatch,
    query,
    getDocs
} = require('firebase/firestore');

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

const createAuthDocumentFromSession = async (sessionData) => {
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

const getAuthDoc = async (authSession) => {
    const collectionRef = collection(db, 'auth')
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q)
    const snapshotDocs = querySnapshot.docs.map((doc) => doc.data()).filter((doc) => doc.authSession === authSession)
    return snapshotDocs[0]
}

const updateAuthDoc = async (authSession, token) => {
    const sessionRef = doc(db, 'auth', authSession)
    await updateDoc(sessionRef, {
        accessToken: token
    })
    return sessionRef
}

const deleteAuthDocumentFromSession = async (session) => {
    await deleteDoc(doc(db, "auth", session));    
}

module.exports = { createAuthDocumentFromSession, getAuthDoc, updateAuthDoc, deleteAuthDocumentFromSession }