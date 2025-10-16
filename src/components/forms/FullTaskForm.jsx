import React from 'react'
import TaskFormBase from './TaskFormBase'
import useTasks from '../../hooks/useTasks'

const FullTaskForm = ({ task, isLoading, onSubmit }) => {
	const { editTask, addTask } = useTasks();

	const handleSubmit = async (form) => {
		if (task) {
			onSubmit(() => editTask(task.id, form), "Edit task successfully", "Edit task failed");
		} else {
			onSubmit(() => addTask(form), "Add task successfully", "Add task failed");
		}
	};

	return (
		<TaskFormBase 
			fields={["title", "status", "priority", "dueDate", "assigneeIds", "attachments", "description"]}
			initialData={task}
			isLoading={isLoading}
			onSubmit={handleSubmit}
		/>
	)
}

export default FullTaskForm