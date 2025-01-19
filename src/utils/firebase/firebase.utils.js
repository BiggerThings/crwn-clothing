import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCe7kIXe1LaXgkyBJp1zImqxVM0SI84QcY",
    authDomain: "crwn-clothing-db-50e39.firebaseapp.com",
    projectId: "crwn-clothing-db-50e39",
    storageBucket: "crwn-clothing-db-50e39.firebasestorage.app",
    messagingSenderId: "834057447281",
    appId: "1:834057447281:web:ac45f245d52f0ff5d1b8d0"
};
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if(!userAuth) {
        return;
    }
    
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

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
