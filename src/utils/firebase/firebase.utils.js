import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCe7kIXe1LaXgkyBJp1zImqxVM0SI84QcY",
    authDomain: "crwn-clothing-db-50e39.firebaseapp.com",
    projectId: "crwn-clothing-db-50e39",
    storageBucket: "crwn-clothing-db-50e39.firebasestorage.app",
    messagingSenderId: "834057447281",
    appId: "1:834057447281:web:ac45f245d52f0ff5d1b8d0"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);