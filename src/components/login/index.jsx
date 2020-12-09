import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Input, Button, Checkbox } from "antd";
import { UserSwitchOutlined, RocketOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
class Login extends React.Component {
	static propTypes = {
		setForgetPasswordAction: PropTypes.func,
		setUserInfoAction: PropTypes.func,
	};
	static defaultProps = {
		setForgetPasswordAction: () => {},
		setUserInfoAction: () => {},
	};
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
	}
	onhandleRememberChange = (e) => {
		console.log(e.target.checked);
	};
	onForget = () => {
		this.props.setForgetPasswordAction(true);
	};
	onLoginIn = () => {
		this.setState({
			loading: true,
		});
		const { setUserInfoAction } = this.props;
		setTimeout(async () => {
			await setUserInfoAction({
				currentAuthority: "12",
			});
			this.props.history.push("/");
		}, 2000);
	};
	render() {
		const { loading } = this.state;
		return (
			<div>
				<h2 className="login-in-h2">登&nbsp;&nbsp;录</h2>
				<Input
					size="large"
					className="login-input"
					placeholder="用户名"
					prefix={<UserSwitchOutlined className="login-prefix-style" />}
				/>
				<Input
					size="large"
					className="login-input"
					placeholder="密码"
					prefix={<RocketOutlined className="login-prefix-style" />}
				/>
				<div className="login-forget-password">
					<span>
						<Checkbox onChange={this.onhandleRememberChange}>记住密码</Checkbox>
					</span>
					<span className="login-forget" onClick={this.onForget}>
						忘记密码
					</span>
				</div>
				<Button
					loading={loading}
					size="large"
					className="login-btn"
					type="primary"
					onClick={this.onLoginIn}
				>
					登&nbsp;&nbsp;录
				</Button>
			</div>
		);
	}
}
const mapState = (state = {}) => {
	return {};
};
const mapDispatch = (dispatch) => {
	return {
		setForgetPasswordAction: dispatch.Login.setForgetPasswordAction,
		setUserInfoAction: dispatch.Common.setUserInfoAction,
	};
};
export default connect(mapState, mapDispatch)(withRouter(Login));
