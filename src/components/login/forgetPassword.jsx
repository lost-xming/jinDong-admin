import React from "react";
import { Input, Button } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	UserSwitchOutlined,
	CodepenOutlined,
	LeftOutlined,
	RocketOutlined,
} from "@ant-design/icons";
class ForgetPassword extends React.Component {
	static propTypes = {
		setForgetPasswordAction: PropTypes.func,
	};
	static defaultProps = {
		setForgetPasswordAction: () => {},
	};
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
	}
	goBack = () => {
		this.props.setForgetPasswordAction(false);
	};
	onResetPass = () => {
		this.setState({
			loading: true,
		});
	};
	render() {
		const { loading } = this.state;
		return (
			<div>
				<h2 className="login-in-h2">忘记密码</h2>
				<Input
					size="large"
					className="login-input"
					placeholder="手机号"
					prefix={<UserSwitchOutlined className="login-prefix-style" />}
				/>
				<Input
					size="large"
					className="login-input"
					placeholder="验证码"
					prefix={<CodepenOutlined className="login-prefix-style" />}
				/>
				<Input
					size="large"
					className="login-input"
					placeholder="新密码"
					prefix={<RocketOutlined className="login-prefix-style" />}
				/>
				<div>
					<Button
						size="large"
						className="login-forget-btn"
						type="link"
						onClick={this.goBack}
					>
						<LeftOutlined /> 返回
					</Button>
					<Button
						loading={loading}
						size="large"
						className="login-forge-btn"
						type="primary"
						onClick={this.onResetPass}
					>
						修改
					</Button>
				</div>
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
	};
};
export default connect(mapState, mapDispatch)(ForgetPassword);
