import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext";
import { getUserByUid } from "../services/userService";

export const AuthProvider = ({ children }) => {
	const [userData, setUserData] = useState(null);
	const [userAuth, setUserAuth] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			setUserAuth(currentUser);
			setError(null);
			setLoading(true);

			if (currentUser) {
				try {
					const data = await getUserByUid(currentUser.uid);
	
					if (!data) {
						throw new Error("No user data found");
					}
	
					setUserData(data);
	
				} catch (error) {
					setError(error);
					setUserData(null);
				}
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
		error,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
