import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export const signup = (email, password) => {
	return createUserWithEmailAndPassword(auth, email, password);
}

export const login = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password);
}

export const logout = () => {
	return signOut(auth);
}

export const resetPassword = (email) => {
	return sendPasswordResetEmail(auth, email);
}