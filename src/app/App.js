import React from "react";
import BasicRoute from "@/router/index";
import { BrowserRouter } from "react-router-dom";
const App = () => {
	return (
		<BrowserRouter>
			<BasicRoute />
		</BrowserRouter>
	);
};
export default App;
