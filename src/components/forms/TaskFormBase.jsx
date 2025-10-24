import {
	Autocomplete,
	Box,
	CircularProgress,
	FormControl,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { getAssignableUsers } from "../../services/userService";
import { useQueries } from "@tanstack/react-query";
import { getChildableTasks } from "../../services/taskService";
import { useAuth } from "../../hooks/useAuth";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const TaskFormBase = ({ initialData = {}, onSubmit, fields, isLoading }) => {
	console.log("Initial Data:", initialData);
	const { userData } = useAuth();
	const [form, setForm] = useState({
		title: "",
		description: "",
		status: "open",
		priority: "medium",
		dueDate: "",
		assigneeIds: [],
		attachments: [],
		childTasks: [],
		...initialData,
	});
	
	console.log("Form State:", form)
	const formDataQuery = useQueries({
		queries: [
			{
				queryKey: ["members", userData.id],
				queryFn: () => getAssignableUsers(userData.id),
				enabled:
					(Array.isArray(fields) && fields.includes("childTasks")) ||
					userData.id != null,
			},
			{
				queryKey: ["allTasks", initialData?.id],
				queryFn: () => getChildableTasks(initialData?.id),
				enabled:
					(Array.isArray(fields) && fields.includes("assigneeIds")) ||
					initialData.id != null,
			},
		],
	});

	const isFormDataLoading = formDataQuery.some((r) => r.isLoading);
	const members = formDataQuery[0]?.data;
	const allTasks = formDataQuery[1]?.data;

	const handleChange = (name, value) => {
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e) => {
		const files = Array.from(e.target.files);
		setForm((prev) => ({
			...prev,
			attachments: [...prev.attachments, ...files],
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(form);
	};

	const showField = (field) =>
		fields === "all" || (Array.isArray(fields) && fields.includes(field));

	if (isFormDataLoading) {
		return <p>Loading form data...</p>;
	}

	return (
		<form className="bg-white space-y-5" onSubmit={handleSubmit}>
			{/* Title */}
			{showField("title") && (
				<div>
					<label
						htmlFor="title"
						className="text-sm font-semibold text-gray-700 flex items-center gap-1"
					>
						Task Title <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="title"
						name="title"
						value={form.title}
						onChange={(e) => handleChange("title", e.target.value)}
						required
						className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition"
						placeholder="Enter task title"
						autoFocus
					/>
				</div>
			)}

			<div className="grid grid-cols-3 gap-3 items-center">
				{/* Status */}
				{showField("status") && (
					<div>
						<label
							htmlFor="status"
							className="text-sm font-semibold text-gray-700"
						>
							Status
						</label>
						<select
							id="status"
							name="status"
							value={form.status}
							onChange={(e) => handleChange("status", e.target.value)}
							className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition"
						>
							<option value="open">Open</option>
							<option value="working">Working</option>
							<option value="review">Review</option>
							<option value="done">Done</option>
						</select>
					</div>
				)}

				{/* Priority */}
				{showField("priority") && (
					<div>
						<label
							htmlFor="priority"
							className="text-sm font-semibold text-gray-700"
						>
							Priority
						</label>
						<select
							id="priority"
							name="priority"
							value={form.priority}
							onChange={(e) => handleChange("priority", e.target.value)}
							className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition"
						>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>
					</div>
				)}

				{/* Due Date */}
				{showField("dueDate") && (
					<div>
						<label
							htmlFor="dueDate"
							className="text-sm font-semibold text-gray-700"
						>
							Due Date
						</label>
						<input
							type="date"
							id="dueDate"
							name="dueDate"
							value={form.dueDate}
							onChange={(e) => handleChange("dueDate", e.target.value)}
							className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition"
						/>
					</div>
				)}
			</div>

			<div className="block items-center">
				{/* Assignees */}
				{showField("assigneeIds") && (
					<div>
						<Autocomplete
							multiple
							id="assignee-autocomplete"
							options={members || []}
							limitTags={3}
							getOptionLabel={(option) => option.email}
							value={form.assigneeIds}
							loading={isFormDataLoading}
							disabled={isFormDataLoading}
							loadingText="Loading..."
							noOptionsText="No assignees found"
							onChange={(event, newValue) => {
								handleChange("assigneeIds", newValue);
							}}
							disableCloseOnSelect
							autoHighlight
							openOnFocus
							renderInput={(params) => (
								<TextField
									{...params}
									label="Assign to"
									placeholder="Find by email"
								/>
							)}
							renderOption={(props, option) => (
								<Box
									component="li"
									{...props}
									key={option.id}
								>
									<Box>
										{option.usename || option.email}
										<Box
											component="div"
											sx={{ fontSize: "0.75rem", color: "text.secondary" }}
										>
											{option.email}
										</Box>
									</Box>
								</Box>
							)}
						/>
					</div>
				)}

				<div></div>
			</div>
			{showField("description") && (
				<div>
					<label
						htmlFor="description"
						className="text-sm font-semibold text-gray-700"
					>
						Description
					</label>
					<textarea
						type="date"
						id="description"
						name="description"
						value={form.description}
						onChange={(e) => handleChange("description", e.target.value)}
						className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition"
					/>
				</div>
			)}
			{showField("childTasks") && (
				<div>
					<Autocomplete
						multiple
						id="childTaksks-autocomplete"
						options={allTasks || []}
						limitTags={3}
						getOptionLabel={(option) => option.title}
						value={form.childTasks}
						loading={isFormDataLoading}
						disabled={isFormDataLoading}
						loadingText="Loading..."
						noOptionsText="No tasks found"
						onChange={(event, newValue) => {
							handleChange("childTasks", newValue);
						}}
						disableCloseOnSelect
						autoHighlight
						openOnFocus
						renderInput={(params) => (
							<TextField
								{...params}
								label="Add Sub-tasks"
								placeholder="Find by title"
							/>
						)}
						renderOption={(props, option) => (
							<Box
								component="li"
								{...props}
								key={option.id}
							>
								<Box>
									{option.title}
									<Box
										component="div"
										sx={{ fontSize: "0.75rem", color: "text.secondary", textTransform: "capitalize"}}
									>
										{option.status}
									</Box>
								</Box>
							</Box>
						)}
					/>
				</div>
			)}

			{/* Attachments */}
			{showField("attachments") && (
				<div>
					<label className="text-sm font-semibold text-gray-700">
						Attachments
					</label>
					<input
						type="file"
						multiple
						onChange={handleFileChange}
						className="mt-1 block w-full text-sm text-gray-500"
					/>
					<ul className="mt-2 text-sm text-gray-600">
						{form.attachments.map((file, idx) => (
							<li key={idx}>{file.name}</li>
						))}
					</ul>
				</div>
			)}

			{/* Submit */}
			<div className="flex justify-end">
				<button
					type="submit"
					disabled={isLoading}
					className="items-center bg-[var(--primary)] hover:bg-[var(--hover)] text-white font-semibold px-6 py-2 rounded-lg shadow transition disabled:cursor-not-allowed"
				>
					{isLoading ? (
						<CircularProgress color="white" size={16} />
					) : (
						<span>Add Task</span>
					)}
				</button>
			</div>
		</form>
	);
};

export default TaskFormBase;
