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
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
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

    return querySnapshot.docs.map(doc => doc.data());
}

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) {
        return;
    }

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
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
        if (!email || !password) {
            return;
        }

        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
        if (err.code === "auth/email-already-in-use") {
            alert("Cannot create user. Email already in use");

        } else {
            console.log(err);
        }
    }
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    try {
        if (!email || !password) {
            return;
        }

        return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        if (err.code === "auth/invalid-credential") {
            alert("Invalid email/password. Please try again.");

        } else {
            console.log(err);
        }
    }
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);