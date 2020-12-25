import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Input, Button, Checkbox, message } from "antd";
import { UserSwitchOutlined, RocketOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
class Login extends React.Component {
	static propTypes = {
		setForgetPasswordAction: PropTypes.func,
		setUserInfoAction: PropTypes.func,
		getData: PropTypes.func,
	};
	static defaultProps = {
		setForgetPasswordAction: () => {},
		setUserInfoAction: () => {},
		getData: () => {},
	};
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			userName: "",
			password: "",
		};
	}
	onhandleRememberChange = (e) => {
		console.log(e.target.checked);
	};
	onForget = () => {
		this.props.setForgetPasswordAction(true);
	};
	onLoginIn = async () => {
		const { userName, password } = this.state;
		const { setUserInfoAction, getData } = this.props;
		this.setState({
			loading: true,
		});
		let data = {};
		try {
			data = await getData({ userName, password });
		} catch (error) {}
		this.setState({
			loading: false,
		});
		if (data.msg === "成功") {
			message.success("登入成功");
			setTimeout(async () => {
				await setUserInfoAction({
					currentAuthority: data.data,
				});
				this.props.history.push("/");
			}, 1000);
		}
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
					onChange={(e) => {
						this.setState({
							userName: e.target.value,
						});
					}}
					prefix={<UserSwitchOutlined className="login-prefix-style" />}
				/>
				<Input
					size="large"
					className="login-input"
					placeholder="密码"
					onChange={(e) => {
						this.setState({
							password: e.target.value,
						});
					}}
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
		setForgetPasswordAction: dispatch.login.setForgetPasswordAction,
		setUserInfoAction: dispatch.Common.setUserInfoAction,
		getData: dispatch.loginCom.getData,
	};
};
export default connect(mapState, mapDispatch)(withRouter(Login));
