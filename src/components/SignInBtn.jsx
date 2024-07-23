import React from 'react';
import GoogleButton from 'react-google-button';
import {auth} from '../firebase';
import { GoogleAuthProvider, signInWithPopup  } from 'firebase/auth';


const googleSignIn =()=>{

    const provider = new GoogleAuthProvider()
    signInWithPopup(auth,provider)


}

const SignInBtn = () => {
  return (
    <div>
        <GoogleButton onClick={googleSignIn}/>
    </div>
  )
}

export default SignInBtn