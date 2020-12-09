import React, { Fragment, Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthorizedRoute from "@/components/authorized/route";
import { appRouters, configRouters } from "./router.js";
import LayoutBox from "@/app/layout/index";
const renderItem = (routerArr) => {
	return routerArr.map((r) => {
		const { path, children, redirect } = r;
		if (children && children.length) {
			return (
				<Fragment key={path}>
					{redirect && <Redirect from={path} to={redirect} />}
					<Route
						key={path}
						path={path}
						render={() => {
							return renderItem(children);
						}}
					/>
				</Fragment>
			);
		} else {
			return <AuthorizedRoute key={path} {...r} />;
		}
	});
};
const renderConfigRouter = (arr) => {
	return arr.map((item) => {
		return (
			<Route path={item.path} key={item.path} component={item.component} />
		);
	});
};
const BasicRoute = () => {
	return (
		<Switch>
			{renderConfigRouter(configRouters)}
			<LayoutBox>{renderItem(appRouters)}</LayoutBox>
		</Switch>
	);
};
export default BasicRoute;
