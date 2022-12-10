import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate, Link } from "react-router-dom";
import { deleteTaskThunk, getProjectThunk, deleteProjectThunk, createTaskThunk } from "./projectSlice.js";

const Project = () => {
	const { project, redirect } = useSelector(state => state.project);
	const { id } = useParams();
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(getProjectThunk(id));
	}, [dispatch, id]);
	
	const handleDelete = (id_project) => {
		dispatch(deleteProjectThunk(id_project));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		let data = {
			name: e.target.name.value,
			description: e.target.description.value,
			estimated_duration: e.target.duration.value,
			id_project: id,
		}
		if (data.name && data.description && data.estimated_duration) dispatch(createTaskThunk(data));
		e.target.name.value = "";
		e.target.description.value = "";
		e.target.duration.value = "";
	}
		
	const handleTaskDelete = (e, id_task) => {
		e.preventDefault();
		dispatch(deleteTaskThunk({ id_project: id, id: id_task }));
	}

	if (redirect)
		return (<Navigate to="/"/>);

	return(
		<div>
			<Link to="/">Back</Link>
			{(!project) && <p>loading...</p>}
			{(project) && 
				<div className="container">
					<h2>{project.name}</h2>
					<p>{project.description}</p>
					<button onClick={() => handleDelete(project._id)}>Delete</button>
					<h3>Tasks</h3>
					<div>
						{(project.tasks.length > 0) ? 
							project.tasks.map((v, k) => (
								<div key={k}>
									<p><b>{v.name}</b> - {v.estimated_duration} min - <a href="#delete" onClick={(e) => handleTaskDelete(e, v._id)}>delete</a></p>
									<p>{v.description}</p>
								</div>
							))
						: <p>Nothing to show yet</p>}
						<form onSubmit={(e) => handleSubmit(e)}>
							<input type="text" placeholder="Task name" name="name"/>
							<input type="number" placeholder="Estimate duration" name="duration" min={1} step={1}/>
							<textarea placeholder="Task description" name="description"></textarea>
							<input type="submit" value="Add"/>
						</form>
					</div>
				</div>
			}
		</div>
	);
}

export default Project;
