import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { addUser } from "./userService";
import { serverTimestamp } from "firebase/firestore";

export const signup = async (email, password) => {
	const res = await createUserWithEmailAndPassword(auth, email, password);
	const user = res.user;
	
	await addUser({
		id: user.uid,
		email: user.email,
		password: password,
		passwordHash: user.reloadUserInfo.passwordHash,
		userName: user.displayName || email,
		avatar: user.photoURL || "",
		role: "member",
		createdAt: serverTimestamp(),
		lastLoginAt: serverTimestamp(),
		updatedAt: serverTimestamp(),
		passwordUpdatedAt: serverTimestamp(),
	});

	return res;
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