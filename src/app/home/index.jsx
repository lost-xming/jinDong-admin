import React from "react";
import { Result, Button } from "antd";
export default class Home extends React.Component {
	render() {
		return (
			<div className="homeStyle">
				<Result
					status="403"
					title="欢迎进入管理后台"
					subTitle="主人你好，欢迎回来！"
					extra={null}
				/>
				,
			</div>
		);
	}
}
