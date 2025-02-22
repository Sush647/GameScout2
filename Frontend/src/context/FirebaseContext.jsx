import {createContext, useContext, useEffect, useState} from "react"
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,updateProfile, onAuthStateChanged,GoogleAuthProvider,signInWithEmailAndPassword,signOut,signInWithPopup} from 'firebase/auth'
import {getFirestore,collection,addDoc,query,deleteDoc,getDoc, where,getDocs, setDoc, doc} from "firebase/firestore"
const FirebaseContext=createContext(null);


const firebaseConfig = {
   YOUR FIREBASE CONFIG;
  };

const firebaseapp=initializeApp(firebaseConfig);

const firebaseauth=getAuth(firebaseapp);
const googleprovider=new GoogleAuthProvider();
const firestore=getFirestore(firebaseapp);

export const Firebaseprovider=(props)=>{

    let[user,setuser]=useState(null)
    let [favourite,setfavourite]=useState(false)
    let [docid,setdocid]=useState(null)

    useEffect(()=>{
        onAuthStateChanged(firebaseauth,(user)=>{
            if(user){
                setuser(user)
            }else{
                setuser(null)
            }
        })
    })

    let isloggedin=user?true:false;

    const signup=(username,email,password)=>{
        createUserWithEmailAndPassword(firebaseauth,email,password)
        .then((newuser)=>{
            let currentuser=newuser.user;
            updateProfile(currentuser,{
                displayName:username,
            })
        }).then(()=>{alert("Signup successfull!")}).catch((e)=>{alert(`error occured: ${e.message}`)})
    }

    const login=(email,password)=>{
        signInWithEmailAndPassword(firebaseauth,email,password).then(()=>{alert("Login Successfull!")}).catch((e)=>{`some error occured: ${e.message}`})
    }

    const loginwithgoogle=()=>{
        signInWithPopup(firebaseauth,googleprovider);
    }

    const logout=()=>{
        signOut(firebaseauth).then(()=>{
            alert("logged out successfully!")
            setuser(null)
        }).catch((e)=>{`some error occured: ${e.message}`})
    }

    const checkfav=async(gameid,userid)=>{
        let collectionref=collection(firestore,"favourites");
        let q=query(collectionref,where("gid","==",gameid),where("uid","==",userid));
        let result=await getDocs(q);
        if(!result.empty){
            let doc=result.docs[0];
            setdocid(doc.id)
            setfavourite(true)
        }else{
            setfavourite(false)
            setdocid(null)
        }

    }

    const savedata=async(name,imagelink,gameid)=>{
        let collectionref=collection(firestore,"favourites");
        if(favourite && docid){
            let docref = doc(firestore, "favourites", docid);
            try {
                await deleteDoc(docref);
                alert("Game removed from favourites!");
                setfavourite(false);
                setdocid(null);
            } catch (e) {
                alert(`Some error occurred: ${e.message}`);
            }
        }else {
            try {
                let result = await addDoc(collectionref, {
                    title: name,
                    image: imagelink,
                    gid: gameid,
                    uid: user.uid
                });
                alert("Game added to favourites!");
                setfavourite(true);
                setdocid(result.id); 
            } catch (e) {
                alert(`Some error occurred: ${e.message}`);
            }
        }
    };

    const getsavedgames=async(userid)=>{
        const collectionref=collection(firestore,"favourites");
        let q=query(collectionref,where("uid","==",userid));
        let result=await getDocs(q);
        return result
    }
    

    return(
        <FirebaseContext.Provider value={{signup,login,loginwithgoogle,logout,isloggedin,user,savedata,favourite,setfavourite,checkfav,setdocid,getsavedgames}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export const usefirebase=()=>{
    return useContext(FirebaseContext);
}
