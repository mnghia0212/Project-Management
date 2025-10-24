import React from "react";
import TaskFormBase from "./TaskFormBase";
import { useCreateTask, useUpdateTask } from "../../hooks/useTaskMutations";

const FullTaskForm = ({ taskData, closeDrawer }) => {
	const { mutate: createTask, isPending: isCreating } = useCreateTask();
	const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();

	const handleSubmit = (formData) => {
		if (taskData) {
			updateTask(
				{ taskId: taskData.id, updates: formData },
				{
					onSuccess: () => closeDrawer(),
				}
			);
		} else {
			createTask(formData, {
				onSuccess: () => closeDrawer(),
			});
		}
	};

	const isLoading = isCreating || isUpdating;

	return (
		<TaskFormBase
			fields={[
				"title",
				"status",
				"priority",
				"dueDate",
				"assigneeIds",
				"attachments",
				"description",
				"childTasks",
			]}
			initialData={taskData}
			isLoading={isLoading}
			onSubmit={handleSubmit}
		/>
	);
};

export default FullTaskForm;
