import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./app/home/Home.js";
import Project from "./app/project/Project.js";
import './App.css';

const App = () => {
	return(
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/:id" element={<Project />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
