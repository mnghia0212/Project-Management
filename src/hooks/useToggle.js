import { useState } from "react";
import toast from "react-hot-toast";

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prev => !prev);

  const onSubmit = async (submitFn, successMsg, errorMsg) => {
    try {
		setIsLoading(true);
		await submitFn();
		close();
		toast.success(successMsg);
    } catch (error) {
    	toast.error(`${errorMsg}: ${error}`);
    } finally {
		setIsLoading(false);
    }
  };

  return { isOpen, isLoading, open, close, toggle, onSubmit, setIsLoading };
};