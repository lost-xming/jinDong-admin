import React from "react";
import { Result, Button } from "antd";

export default class Err extends React.Component {
	goHome = () => {
		this.props.history.push("/");
	};
	render() {
		return (
			<Result
				status="404"
				title="404"
				subTitle="对不起, 你的页面被狗叼走了...!"
				extra={
					<Button type="primary" onClick={this.goHome}>
						返回首页
					</Button>
				}
			/>
		);
	}
}
