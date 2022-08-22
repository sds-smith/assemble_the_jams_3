const {initializeApp} = require('firebase/app');
const { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc,
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

const getUserDocRef = (user) => {
    return doc(db, 'users', user.name)
}

const getUserSnapshot = async (userDocRef) => {
    const userSnapshot = await getDoc(userDocRef)
    return userSnapshot
}

const isUnregisteredUser = async (userDocRef) => {
    const userSnapshot = await getUserSnapshot(userDocRef)
    return userSnapshot.data().isRegistered === undefined
}

const setName = async (user, name) => {
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

const createUserDocumentFromReg = async (userReg) => {
    const userDocRef = getUserDocRef(userReg)

    const userSnapshot = await getUserSnapshot(userDocRef)

    if (!userSnapshot.exists()) {
        const { name, email } = userReg
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                name, 
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user', error)
        }
    }

    return userDocRef
}

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

const deleteAuthDocumentFromSession = async (session) => {
    // await db.collection('auth').doc(session).delete()
    await deleteDoc(doc(db, "auth", session));
    
}
// const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
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
const getAuthDoc = async (authSession) => {
    const collectionRef = collection(db, 'auth')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    const snapshotDocs = querySnapshot.docs.map((doc) => doc.data()).filter((doc) => doc.authSession === authSession)
    return snapshotDocs[0]
}

module.exports = { createUserDocumentFromReg, createAuthDocumentFromSession, getAuthDoc, deleteAuthDocumentFromSession }