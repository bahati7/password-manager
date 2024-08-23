import { collection, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase";

const ViewCode = ({ onReturnToForm }) => {
    const [messages, setMessages]= useState([])
  const scroll = useRef();

  useEffect(()=>{
    const q=query(collection(db,'messages'),orderBy('timestamp'));
    const unsubscribe = onSnapshot(q,(querySnapshot)=>{
        let messages = [];
        querySnapshot.forEach((doc)=>{
            messages.push({id:doc.id,...doc.data()});
        });
        setMessages(messages)
    })
    return ()=>unsubscribe();
  },[])
  return (
    <div>
      <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between gap-5 mb-4">
          <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Your Passwords
          </h5>
          <a
            href="#"
            onClick={() => onReturnToForm()}
            class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Go Back
          </a>
        </div>
        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            {messages && messages.map((message)=>(
             <li class="py-3 sm:py-4">
             <div class="flex items-center">
               <div class="flex-shrink-0">
                 {/* <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"> */}
               </div>
               <div class="flex-1 min-w-0 ms-4">
                 <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                   {message.company}
                 </p>
                 <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                   {message.password}
                 </p>
               </div>
               <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                 Delete
               </div>
             </div>
           </li>
            ))}
          </ul>
        </div>
      </div>
      <span ref={scroll}></span>
    </div>
  );
};

export default ViewCode;
