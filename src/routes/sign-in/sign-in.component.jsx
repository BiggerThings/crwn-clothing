import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils"

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
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