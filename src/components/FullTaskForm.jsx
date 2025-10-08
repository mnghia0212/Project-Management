import React from 'react'
import TaskFormBase from './TaskFormBase'
import useTasks from '../hooks/useTasks'
import toast from 'react-hot-toast'


const FullTaskForm = ({ task, setShowDrawer }) => {
	const { editTask, addTask } = useTasks();

	const handleSubmit = async (form) => {
		try {
		if (task) {
			await editTask(task.id, form);
		} else {
			await addTask(form);
		}
		setShowDrawer(false);
		toast.success("Submit task successfully");
		} catch (error) {
		toast.error(`Error submitting task: ${error.message}`);
		}
	};

	return (
		<TaskFormBase 
			fields={["title", "status", "priority", "dueDate", "assigneeIds", "attachments"]}
			initialData={task}
			onSubmit={handleSubmit}
		/>
	)
}

export default FullTaskForm