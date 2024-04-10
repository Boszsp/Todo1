import { initializeApp } from 'firebase/app';
import { getFirestore,addDoc,collection,deleteDoc,setDoc,doc, updateDoc } from 'firebase/firestore';
import {getAuth , EmailAuthProvider,signInWithEmailAndPassword,signOut,signInAnonymously} from "firebase/auth"
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "todoa-1",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

export const app =initializeApp(firebaseConfig);

export const db = getFirestore();

export const auth = getAuth()


export const logout = ()=>signOut(auth)


export const login = (email,password) => signInWithEmailAndPassword(auth, email, password)

export const loginAno = (email,password) => {
    signInAnonymously(auth)
}


export const setTodo = (lists)=> {
    let objData = {};
    for (let i = 0; i < lists.length; i++) {
        objData[i+1] = lists[i].name;
    }

    setDoc(doc(db, 'todo', 'list1'), objData);
}
export const delTodo = (lists)=>{
    setTodo(lists.filter(
        (val)=>!val.checked
    ))
}

export const addTodo = (taskk)=>{
    let holds = {}
    holds[""+Math.floor(Math.random()*10000000)] = taskk
    updateDoc(doc(db, 'todo', 'list1'), 
        holds
    );

}