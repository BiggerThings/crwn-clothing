import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCe7kIXe1LaXgkyBJp1zImqxVM0SI84QcY",
    authDomain: "crwn-clothing-db-50e39.firebaseapp.com",
    projectId: "crwn-clothing-db-50e39",
    storageBucket: "crwn-clothing-db-50e39.firebasestorage.app",
    messagingSenderId: "834057447281",
    appId: "1:834057447281:web:ac45f245d52f0ff5d1b8d0"
};
  
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(app);

export const addCollectionAndDocuments = async (key, objectsToAdd) => {
    try {
        const batch = writeBatch(db);
        
        objectsToAdd.forEach((obj) => {
            const docRef = doc(db, key, obj.title.toLowerCase());
            
            batch.set(docRef, obj);
        })
        await batch.commit();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if(!userAuth) {
        return;
    }
    
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        } catch (err) {
            console.log(err);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    try {
        if(!email || !password) {
            return;
        }
        
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
        if(err.code === "auth/email-already-in-use") {
            alert("Cannot create user. Email already in use");

        } else {
            console.log(err);
        }
    }
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    try {
        if(!email || !password) {
            return;
        }
        
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        if(err.code === "auth/invalid-credential") {
            alert("Invalid email/password. Please try again.");

        } else {
            console.log(err);
        }
    }
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);