import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signup, login, logout, resetPassword } from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";
import { getUserByUid } from "../services/userService";

export const AuthProvider = ({ children }) => {
	const [userData, setUserData] = useState(null);
	const [userAuth, setUserAuth] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {			
			setUserAuth(currentUser);
			if (currentUser) {
				const data = await getUserByUid(currentUser.uid);
				setUserData(data);
			} else {
				setUserData(null);
			}
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	const value = {
		userAuth,
		userData,
		loading,
		signup,
		login,
		logout,
		resetPassword,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
