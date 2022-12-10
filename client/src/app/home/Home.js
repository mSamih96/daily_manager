import React, { useEffect } from "react";
import { getProjectThunk, postProjectThunk } from "./homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetRedirect } from "../project/projectSlice.js";
import { createPlanningThunk, setCounter } from "../planning/planningSlice.js";

const Home = () => {
	let dispatch = useDispatch();
	const { loading, projects } = useSelector((state) => state.home);
	const { planning, planningLoading, counter } = useSelector((state) => state.planning);

	useEffect(() => {
		dispatch(resetRedirect());
		dispatch(getProjectThunk());
	}, [dispatch]);
	
	const handleSubmit = (e) => {
		e.preventDefault();
		let data = {
			name: e.target.name.value, 
			description: e.target.description.value,
		};
		if (data.name && data.description) dispatch(postProjectThunk(data));
		e.target.name.value = "";
		e.target.description.value = "";
	};

	const startDailySprint = () => {
		dispatch(createPlanningThunk());
	}

	const handleStart = (duration_minute) => {
		dispatch(setCounter(duration_minute * 60));
	}

	useEffect(() => {
		if (counter) {
               		let timer = setInterval(() => {
               			dispatch(setCounter(counter - 1));
                	}, 1000);

        		return () => clearInterval(timer);
        	}
	});


	return (
		<div className="container">
			<div>
				<p>{counter}</p>
				<h2>Daily Planning</h2>
				{(!planningLoading && !planning) && <button onClick={() => startDailySprint()}>Start Session</button>}
				{(planningLoading) && <p>Loading...</p>}
				{(planning) && planning.tasks.map((v, k) => (
					<div key={k}>
						<h3>{v.name} - {v.estimated_duration}</h3>
						<p>{v.description}</p>
						<button onClick={() => handleStart(v.estimated_duration)}>Commencer</button>
						<button>Reporter</button>
					</div>
				))}
			</div>
			<div>
				<h2>Projects</h2>
				<form onSubmit={(e) => handleSubmit(e)}>
					<input src="text" name="name" placeholder="Project name"/><br/>
					<textarea placeholder="Project description" name="description"></textarea><br/>
					<input type="submit" value="Add"/>
				</form>
				{(!loading) ? 
					(projects.length === 0) ? <p>Nothing to show yet.</p> :
					projects.map((v, k) => (
						<div key={k}>
							<h2>{v.name} - (0/{v.tasks.length})</h2>
							<p>{v.description}</p>
							<Link to={`/${v._id}`}>Voir plus.</Link>
						</div>
					))
				: <p>Loading...</p>}
			</div>
		</div>
	);
}

export default Home;
