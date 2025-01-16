import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        console.log(user);
        createUserDocumentFromAuth(user);
    }
    
    return (
      <div>  
        <h1>SignIn Page</h1>
        <button onClick={logGoogleUser}>
            Sign In With Google Pop Up
        </button>
      </div>
    );
}

export default SignIn;