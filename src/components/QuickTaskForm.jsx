import React from 'react'
import TaskFormBase from './TaskFormBase'
import useTasks from '../hooks/useTasks'
import toast from 'react-hot-toast'

const QuickTaskForm = ({ showModal, setShowModal }) => {
	const { addTask } = useTasks();

	const handleAddTask = async (task) => {
		try {
			await addTask(task);
			setShowModal(false);
			toast.success("Task created successfully")
		} catch (error) {
			toast.error(`Error create task: ${error}`)
		}
	}

	return (
		<TaskFormBase fields={["title", "status"]} onSubmit={handleAddTask} />
	)
}

export default QuickTaskForm