import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import useTasks from "../hooks/useTasks";
import Spinner from "../components/Spinner";
import TaskCard from "./TaskCard";
import TaskDrawer from "../components/TaskDrawer";
import { useToggle } from "../hooks/useToggle";

const taskStatus = ["open", "working", "review", "done"];

const TaskList = () => {
	const { isOpen, open, close } = useToggle();
	const { loading, tasks } = useTasks();
	const [selectedTask, setSelectedTask] = useState(null);

	const filterTasksByStatus = (status) => {
		return tasks.filter((task) => task.status === status);
	};

	const handleCLoseDrawer = () => {
		setSelectedTask(null);
		close();
	}

	const handleOpenDrawer = (task) => {
		setSelectedTask(task);
		open();
	}

	console.log(selectedTask);
	
	

	return (
		<div className="flex-1 grid grid-cols-4 gap-7 bg-[var(--surface)] py-4 px-7 overflow-y-auto scrollbar">
			{loading ? (
				<div className="flex items-center justify-center col-span-4">
					<Spinner />
				</div>
			) : (
				taskStatus.map((status) => {
					const tasksByStatus = filterTasksByStatus(status);

					return (
						<div key={status} className="flex flex-col">
							{/* Task Status Title*/}
							<div className="flex justify-between items-center mb-7">
								{displayTask(status, tasksByStatus.length)}

								<button className="text-gray-500">
									<FaPlus className="w-4 h-4" />
								</button>
							</div>

							{/* Task List By Status */}
							<div key={status} className="space-y-4 flex-1">
								{tasksByStatus.map((task) => (
									<TaskCard
										key={task.id}
										taskData={task}
										onClickTaskCard={() => handleOpenDrawer(task)}
									/>
								))}
							</div>
						</div>
					);
				})
			)}
			<TaskDrawer 
				taskData={selectedTask} 
				isOpenDrawer={isOpen} 
				closeDrawer={handleCLoseDrawer} 
			/>
		</div>
	);
};

const displayTask = (taskStatus, taskNumber) => {
	return (
		<h2
			className={`
    font-bold capitalize
    ${taskStatus === "open" && "text-[var(--task-open)]"}
    ${taskStatus === "working" && "text-[var(--task-working)]"}
    ${taskStatus === "review" && "text-[var(--task-review)]"}
    ${taskStatus === "done" && "text-[var(--task-done)]"}
  `}
		>
			{taskStatus}
			<span className="text-[var(--task-number)] ml-1 font-normal">
				({taskNumber})
			</span>
		</h2>
	);
};

export default TaskList;
