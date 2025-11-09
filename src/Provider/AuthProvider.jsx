import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import { AuthContext } from './AuthContext';

const googleProvider=new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    // get email
    const [email,setEmail]=useState(null);
    // Loading
    const [loading,setLoading]=useState(true);

    console.log(user,loading)
// Register
    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
// Login 
    const loginWithEmailPassword=(email,password)=>{
        // setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
// Google signin
    const googleSignIn=()=>{
        return signInWithPopup(auth,googleProvider);
    }
// SignOut
    const logout=()=>{
        return signOut(auth);
    }
// Update Profile
    const updateUser=(updateData)=>{
        return updateProfile(auth.currentUser,updateData);
    }
// OnAuthStateChange
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })
        return ()=>{
            unsubscribe();
        }
    },[])

    const authData={
        user,
        setUser,
        createUser,
        googleSignIn,
        loginWithEmailPassword,
        logout,
        email,
        setEmail,
        loading,
        setLoading,
        updateUser
    }

    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};

export default AuthProvider;