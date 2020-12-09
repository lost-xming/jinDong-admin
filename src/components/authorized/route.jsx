import React from "react";
import { Route, Redirect } from "react-router-dom";
import Authorized from "./index";
const NoMatch = (r) => {
	// redirectPath  统一重定向到 404
	return <Route path={r.path} render={() => <Redirect to={"/404"} />} />;
};
const HasLogin = () => {
	return <Redirect to={"/login"} />;
};
const AuthorizedRoute = (r) => {
	const { path, component: Component, render, authority, ...rest } = r;
	return (
		<Authorized
			key={path}
			authority={authority}
			noMatch={NoMatch(r)}
			login={HasLogin()}
		>
			<Route
				path={path}
				key={path}
				{...rest}
				render={(props) => {
					return Component ? <Component {...props} /> : render(props);
				}}
			/>
		</Authorized>
	);
};

export default AuthorizedRoute;
