import { Autocomplete, Box, CircularProgress, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { getAssigneeOptions } from "../../services/userService";
import avaTest from "../../assets/react.svg";


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
	const [assigneeOptions, setAssigneeOptions] = useState([]);
	const [isAssigneesLoading, setIsAssigneesLoading] = useState(true);
	const [form, setForm] = useState({
		title: "",
		description: "",
		status: "open",
		priority: "medium",
		dueDate: "",
		assigneeIds: [],
		attachments: [],
		...initialData,
	});

	const handleAssigneeChange = (newValue) => {
        setForm(prev => ({
            ...prev,
            assigneeIds: newValue 
        }));
    };

	const handleChange = (e) => {
		const { name, value } = e.target;
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

	useEffect(() => {
		const getAssignees = async () => {
			try {
				const fetchedAssignees = await getAssigneeOptions();
				setAssigneeOptions(fetchedAssignees || []);
			} catch (error) {
				console.error("Failed to fetch assignees:", error);
			} finally {
				setIsAssigneesLoading(false);
			}
		};

		getAssignees();
	}, []); // Chỉ chạy 1 lần

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
						onChange={handleChange}
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
							onChange={handleChange}
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
							onChange={handleChange}
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
							onChange={handleChange}
							className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition"
						/>
					</div>
				)}
			</div>

			<div className="grid grid-cols-2 items-center">
				{/* Assignees */}
				{showField("assigneeIds") && (
					<div>
							<Autocomplete
								multiple
								id="assignee-autocomplete"
								options={assigneeOptions}
								limitTags={3}
								getOptionLabel={(option) => option.email}
								value={form.assigneeIds}
								name="assigneeIds"
								loading={isAssigneesLoading}
								disabled={isAssigneesLoading}
								loadingText="Loading..."
								noOptionsText="No assignees found"
								onChange={(event, newValue) => {
									handleAssigneeChange(newValue);
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
										sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
										{...props}
										key={option.id}
									>
										<Box>
											{option.email}
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

				<div>

				</div>
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
						onChange={handleChange}
						className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition"
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
