import { useMutation } from '@tanstack/react-query';
import { createTask, updateTask, deleteTask } from '../services/taskService';
import toast from 'react-hot-toast';

export const useCreateTask = () => {
	return useMutation({
		mutationFn: (newTaskData) => createTask(newTaskData),
		onSuccess: () => {
			toast.success("Successfully created task!");
		},
		onError: (error) => {
			toast.error(`Error create task: ${error.message}`);
		}
	});
};

export const useUpdateTask = () => {
	return useMutation({
		mutationFn: ({ taskId, updates }) => updateTask(taskId, updates),
		onSuccess: () => {
			toast.success("Successfully updated task!");
		},
		onError: (error) => {
			toast.error(`Error update task: ${error.message}`);
		},
	});
};

export const useDeleteTask = () => {
	return useMutation({
		mutationFn: (taskId) => deleteTask(taskId),
		onSuccess: () => {
			toast.success("Successfully deleted task!");
		},
		onError: (error) => {
			toast.error(`Error delete task: ${error.message}`);
		},
	});
};