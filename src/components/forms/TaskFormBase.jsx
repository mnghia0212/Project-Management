import {
	Autocomplete,
	Box,
	CircularProgress,
	FormControl,
} from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { getAssignableUsers } from "../../services/userService";
import { useQueries } from "@tanstack/react-query";
import { getChildableTasks } from "../../services/taskService";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../Spinner";

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

const status = [
	{ value: 'open', label: 'Open' },
	{ value: 'working', label: 'Working' },
	{ value: 'done', label: 'Done' },
	{ value: 'review', label: 'Review' },
];

const priority = [
	{ value: 'low', label: 'Low' },
	{ value: 'medium', label: 'Medium' },
	{ value: 'high', label: 'High' },
];

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

	return (
		<form className="bg-white space-y-5" onSubmit={handleSubmit}>
			{/* Title */}
			{showField("title") && (
				<Box
					component="form"
					noValidate
					autoComplete="on"
				>
					<TextField
						id="title"
						label="Title"
						variant="outlined"
						type="text"
						name="title"
						value={form.title}
						onChange={(e) => handleChange("title", e.target.value)}
						required
						className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition"
						placeholder="Enter task title"
						focused={true}
					/>
				</Box>
			)}

			<div className="grid grid-cols-3 gap-3 items-center">
				{/* Status */}
				{showField("status") && (
					<Box
						component="form"
						noValidate
						autoComplete="on"
					>
						<TextField
							id="status"
							select
							label="Status"
							defaultValue="Open"
							value={form.status}
							onChange={(e) => handleChange("status", e.target.value)}
							className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition"
						>
						{status.map((option) => (
							<MenuItem key={option.value} value={option.value}>
							{option.label}
							</MenuItem>
						))}
						</TextField>
					</Box>
				)}

				{/* Priority */}
				{showField("priority") && (
					<Box
						component="form"
						noValidate
						autoComplete="on"
					>
						<TextField
							id="priority"
							select
							label="Priority"
							defaultValue="Low"
							value={form.priority}
							onChange={(e) => handleChange("priority", e.target.value)}
							className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition"
						>
						{priority.map((option) => (
							<MenuItem key={option.value} value={option.value}>
							{option.label}
							</MenuItem>
						))}
						</TextField>
					</Box>
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
								<Box component="li" {...props} key={option.id}>
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
							<Box component="li" {...props} key={option.id}>
								<Box>
									{option.title}
									<Box
										component="div"
										sx={{
											fontSize: "0.75rem",
											color: "text.secondary",
											textTransform: "capitalize",
										}}
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
