import React from "react";
import { Layout, Dropdown, Menu } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	DownOutlined,
	CustomerServiceOutlined,
	LogoutOutlined,
} from "@ant-design/icons";
import "./index.less";
const { Header } = Layout;
class HeaderCom extends React.Component {
	static propTypes = {
		collapsed: PropTypes.bool,
		setUserInfoAction: PropTypes.func,
	};
	static defaultProps = {
		collapsed: false,
		setUserInfoAction: () => {},
	};
	toggle = () => {
		const { setCollapsed, collapsed } = this.props;
		setCollapsed(!collapsed);
	};
	creatIcon = () => {
		const { collapsed } = this.props;
		return React.createElement(
			collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
			{
				className: "trigger",
				onClick: this.toggle,
			}
		);
	};
	onCustomer = () => {
		console.log(1234);
	};
	onLoginOut = () => {
		const { setUserInfoAction } = this.props;
		setUserInfoAction({});
	};
	renderTip = () => {
		return (
			<Menu>
				<Menu.Item>
					<span onClick={this.onCustomer}>
						<CustomerServiceOutlined />
						<span className="menu-tip-text">联系客服</span>
					</span>
				</Menu.Item>
				<Menu.Item>
					<span onClick={this.onLoginOut}>
						<LogoutOutlined /> <span className="menu-tip-text">退出登录</span>
					</span>
				</Menu.Item>
			</Menu>
		);
	};
	renderLoginOut = () => {
		return (
			<Dropdown
				className="login-out"
				overlay={this.renderTip()}
				placement="bottomRight"
			>
				<div>
					<img
						className="user-img"
						src={require("./../../images/login/b1.jpg").default}
						alt="user"
					/>
					<span className="user-name">用户名</span>
					<DownOutlined />
				</div>
			</Dropdown>
		);
	};
	render() {
		return (
			<Header className="site-layout-header">
				{this.creatIcon()}
				{this.renderLoginOut()}
			</Header>
		);
	}
}

const mapState = (state = {}) => {
	return {
		collapsed: state.SiderStore.collapsed,
	};
};
const mapDispatch = (dispatch) => {
	return {
		setCollapsed: dispatch.SiderStore.setCollapsedAction,
		setUserInfoAction: dispatch.Common.setUserInfoAction,
	};
};
export default connect(mapState, mapDispatch)(HeaderCom);
