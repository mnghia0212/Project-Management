import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext";
import { getUserByUid } from "../services/userService";
import {
	login as loginService,
	signup as signupService,
	logout as logoutService,
	resetPassword as resetPasswordService,
} from "../services/authService";

export const AuthProvider = ({ children }) => {
	const [userData, setUserData] = useState(null);
	const [userAuth, setUserAuth] = useState(null);
	const [error, setError] = useState(null);
	const [isInitializing, setIsInitializing] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		let mounted = true;

		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			try {
				if (!mounted) return;
				setError(null);
				setUserAuth(currentUser);

				if (currentUser) {
					const data = await getUserByUid(currentUser.uid);
					if (!mounted) return;
					setUserData(data);
				} else {
					if (!mounted) return;
					setUserData(null);
				}
			} catch (err) {
				if (!mounted) return;
				setError(err);
				setUserData(null);
				setUserAuth(null);
			} finally {
				if (!mounted) {
					// do nothing
				} else {
					setIsInitializing(false);
				}
			}
		});

		return () => {
			mounted = false;
			unsubscribe();
		};
	}, []);

	const handleLogin = async (email, password) => {
		setIsLoading(true);
		setError(null);
		try {
			await loginService(email, password);
		} catch (err) {
			setError(err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const handleSignup = async (email, password, repassword) => {
		setIsLoading(true);
		setError(null);
		try {
			if (password !== repassword) {
				throw new Error("Passwords do not match ! Please try again.");
			}
			await signupService(email, password);
		} catch (err) {
			setError(err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const handleLogout = async () => {
		setIsLoading(true);
		setError(null);
		try {
			await logoutService();
			setUserData(null);
			setUserAuth(null);
		} catch (err) {
			setError(err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const handleResetPassword = async (email) => {
		setIsLoading(true);
		setError(null);
		try {
			await resetPasswordService(email);
		} catch (err) {
			setError(err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const value = {
		userData,
		userAuth,
		error,
		isInitializing,
		isLoading,
		login: handleLogin,
		signup: handleSignup,
		logout: handleLogout,
		resetPassword: handleResetPassword,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
