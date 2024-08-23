import React, { useState } from 'react'
import PasswordGenerator from './PasswordGenerator'
import Logout from './Logout'
import {auth,db} from "../firebase"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

const SendCode = ({onSubmitSuccess}) => {
    const [company, setCompany]=useState("");
    const [password, setPassword]=useState("");

    const sendData = async(e) =>{
        e.preventDefault();
        const {uid,displayName}=auth.currentUser
        await addDoc(collection(db,'messages'),{
            company:company,
            password:password,
            uid,
            timestamp:serverTimestamp()
        })
        onSubmitSuccess();
    }

  return (
    

<div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form onSubmit={sendData} className="space-y-6" action="#">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Generate Passwords</h5>
        <PasswordGenerator/>
        <div>
            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company name</label>
            <input value={company} onChange={(e)=>setCompany(e.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Ex: Upwork" required />
        </div>
        <div>
            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
   
        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add new password</button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300 flex justify-between">
            <Logout/>
            <a href="#"onClick={()=> onSubmitSuccess()} className="text-blue-700 hover:underline dark:text-blue-500">View all</a>
             
        </div>
    </form>
</div>

  )
}

export default SendCode