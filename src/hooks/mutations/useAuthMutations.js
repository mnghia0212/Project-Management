import { useMutation } from "@tanstack/react-query";
import { signup, login, logout, resetPassword } from "../../services/authService";
import toast from "react-hot-toast";



export const useSignupMutation = () => {
	return useMutation({
		mutationFn: ({ email, password }) => signup(email, password),
	});
}

export const useLoginMutation = (navigate) => {
    return useMutation({
        mutationFn: ({ email, password }) => login(email, password), 
		onSuccess: () => {
			navigate("/");
		},
		onError: (error) => {
			toast.error(`Error logging in: ${error.message}`);
		}
    })

};