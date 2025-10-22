import React from "react";
import TaskDrawer from "./TaskDrawer";

const TaskCard = ({ taskData, onClickTaskCard }) => {
	return (
		<div
			className="bg-white p-3 rounded-xl shadow cursor-pointer"
			onClick={onClickTaskCard}
		>
			<div className="flex justify-between items-center mb-1 h-auto space-x-2">
				<div className="flex-1">
					<h3 className="font-semibold break-all line-clamp-5">{taskData.title}</h3>
				</div>
					<div
						className={`rounded-full w-3 h-3 self-start
			  ${taskData.priority === "high" ? "bg-red-500" : ""}
			  ${taskData.priority === "medium" ? "bg-yellow-500" : ""}
			  ${taskData.priority === "low" ? "bg-green-500" : ""}`}
					>
				</div>
			</div>

			<p className="text-sm text-gray-600">{taskData.description}</p>

			<div className="my-2 border-t-1 border-[var(--divider)]" />

			<div className="flex justify-between items-center text-sm">
				<div className="flex gap-1">
					<div className="w-7 h-7 rounded-full bg-blue-300"></div>
				</div>

				{taskData.dueDate && (
					<div>
						<p className="text-[var(--text-blur)]">Due Date</p>
						<p className="text-[var(--text-primary)] font-semibold">
							{taskData.dueDate}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default TaskCard;
