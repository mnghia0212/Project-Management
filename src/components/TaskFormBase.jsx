import React, { useState } from "react";

const TaskFormBase = ({ initialData = {}, onSubmit, fields }) => {
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

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	// const handleFileChange = (e) => {
	// 	const files = Array.from(e.target.files);
	// 	setForm((prev) => ({
	// 		...prev,
	// 		attachments: [...prev.attachments, ...files],
	// 	}));
	// };

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

			{/* Assignees */}
			{showField("assigneeIds") && (
				<div>
					<label
						htmlFor="assigneeIds"
						className="text-sm font-semibold text-gray-700"
					>
						Assignees
					</label>
					<select
						id="assigneeIds"
						name="assigneeIds"
						multiple
						value={form.assigneeIds}
						onChange={(e) =>
							setForm((prev) => ({
								...prev,
								assigneeIds: Array.from(
									e.target.selectedOptions,
									(opt) => opt.value
								),
							}))
						}
						className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition"
					>
						<option value="u1">User 1</option>
						<option value="u2">User 2</option>
						<option value="u3">User 3</option>
					</select>
				</div>
			)}

			{/* Attachments */}
			{showField("attachments") && (
				<div>
					<label
						className="text-sm font-semibold text-gray-700"
					>
						Attachments
					</label>
					<input
						type="file"
						multiple
						// onChange={handleFileChange}
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
					className="items-center bg-[var(--primary)] hover:bg-[var(--hover)] text-white font-semibold px-6 py-2 rounded-lg shadow transition"
				>
					<span>Add Task</span>
				</button>
			</div>
		</form>
	);
};

export default TaskFormBase;
