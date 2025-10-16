import React from 'react'
import TaskFormBase from './TaskFormBase'
import useTasks from '../../hooks/useTasks'

const QuickTaskForm = ({ isLoading, onSubmit}) => {
	const { addTask } = useTasks();

	const handleAddTask = (task) => {
		onSubmit(() => addTask(task), "Task added successfully", "Failed to add task");
	}

	return (
		<TaskFormBase fields={["title", "status", "priority"]} onSubmit={handleAddTask} isLoading={isLoading}/>
	)
}

export default QuickTaskForm