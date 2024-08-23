import { useState } from "react";
import Login from "./components/Login";
import SendCode from "./components/SendCode";

import {auth} from './firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import ViewCode from "./components/ViewCode";


function App() {
  const [user]=useAuthState(auth)
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setIsSubmitted(true); // Set submitted state to true on successful form submission
  };

  const handleReturnToForm = () => {
    setIsSubmitted(false); // Reset submitted state
  };
  
  return (
    <div className="flex justify-center min-h-screen content-center items-center">
  
      {user ?isSubmitted ? null : <SendCode onSubmitSuccess={handleFormSubmit} />:<Login/>}  
   
        {isSubmitted && <ViewCode onReturnToForm={handleReturnToForm} />}
    </div>
  );
}

export default App;
