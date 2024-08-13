import React from 'react'
import {auth} from '../firebase'

const Logout = () => {

    const signOut=()=>{
        signOut(auth)
    }
  return (
    <div >
    <a href="#"onClick={()=>auth.signOut()} className="text-blue-700 hover:underline dark:text-blue-500">Logout</a>
    </div>
  )
}

export default Logout