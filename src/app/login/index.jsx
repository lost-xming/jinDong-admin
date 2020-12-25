import React from "react";
import { Input, Button } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { UserSwitchOutlined, RocketOutlined } from "@ant-design/icons";
import "./index.less";
import Login from "@/components/login";
import ForgetPass from "@/components/login/forgetPassword";
class LoginCom extends React.Component {
	static propTypes = {
		forgetPassword: PropTypes.bool,
	};
	static defaultProps = {
		forgetPassword: false,
	};
	render() {
		const { forgetPassword } = this.props;
		return (
			<div className="login-layout">
				<div className="login-content">
					<div className="login-top">
						<div className="login-top-title">
							<div className="login-logo">LOGO</div>
							<h2>平台-商家端</h2>
						</div>
						<div className="login-top-desc">
							8大赋能，21项服务，全国领先的家装商业平台
						</div>
					</div>
					<div className="login-bottom">
						<div className="login-bottom-image" />
						<div className="login-bottom-text">
							{forgetPassword ? <ForgetPass /> : <Login />}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapState = (state = {}) => {
	return {
		forgetPassword: state.login.forgetPassword,
	};
};
const mapDispatch = (dispatch) => {
	return {};
};
export default connect(mapState, mapDispatch)(LoginCom);
