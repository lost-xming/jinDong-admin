import React from "react";
import { Layout, Menu } from "antd";
import * as Icon from "@ant-design/icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { appRouters } from "@/router/router.js";
import { withRouter } from "react-router";
const { SubMenu } = Menu;
const { Sider } = Layout;
class SiderCom extends React.Component {
	handleOpenChange = (openKeys) => {
		const { breadcrumb } = this.props;
		let openRouterArr = [];
		// 获取两个数组之间的 不同值
		const activeRouter = openKeys.concat(breadcrumb).filter((v, i, arr) => {
			return arr.indexOf(v) === arr.lastIndexOf(v);
		});
		let hasPath = [];
		// 如果存在 则为 新展开，反之为关闭
		if (activeRouter && activeRouter.length) {
			// 判断点击的是否为 一级导航
			hasPath = appRouters.filter((item) => {
				return item.path === activeRouter[0];
			});
			if (openKeys.indexOf(activeRouter[0]) !== -1) {
				// 展开
				if (hasPath.length !== 0) {
					// 如果为展开其他的一级导航
					openRouterArr = activeRouter;
				} else {
					openRouterArr = openKeys;
				}
			} else {
				// 关闭
				openRouterArr = openKeys;
			}
		}
		this.setDispatchRouter(openRouterArr);
	};
	setDispatchRouter = (newBrandArr) => {
		const { setBreadRouter } = this.props;
		// 保存选中的项 导航信息,传递给sider 作为展开项
		setBreadRouter(newBrandArr);
	};
	_renderMenu(item) {
		const { path, title, iconType, hasNotShow } = item;
		return (
			!hasNotShow && (
				<Menu.Item key={path} icon={React.createElement(Icon[iconType])}>
					<Link to={path}>{title}</Link>
				</Menu.Item>
			)
		);
	}
	_renderSubMenu(item) {
		const { children = [], path, title, iconType, hasNotShow } = item;
		if (hasNotShow) {
			return null;
		}
		if (children.length) {
			return (
				<SubMenu
					key={path}
					icon={React.createElement(Icon[iconType])}
					title={title}
				>
					{children.map((menuItem) => {
						return this._renderSubMenu(menuItem);
					})}
				</SubMenu>
			);
		} else {
			return this._renderMenu(item);
		}
	}
	render() {
		const { location = {}, collapsed, breadcrumb } = this.props;
		const { pathname } = location;
		return (
			<Sider
				style={{ height: "100vh", overflowY: "scroll" }}
				trigger={null}
				collapsible
				collapsed={collapsed}
			>
				<div className="logo" />
				<Menu
					theme="dark"
					mode="inline"
					openKeys={!collapsed ? breadcrumb : []}
					selectedKeys={[pathname]}
					onOpenChange={this.handleOpenChange}
				>
					{appRouters.map((rc) => {
						const { children } = rc;
						return children && children.length
							? this._renderSubMenu(rc)
							: this._renderMenu(rc);
					})}
				</Menu>
			</Sider>
		);
	}
}

const mapState = (state = {}) => {
	return {
		collapsed: state.SiderStore.collapsed,
		breadcrumb: state.SiderStore.breadcrumb,
	};
};
const mapDispatch = (dispatch) => {
	return {
		setBreadRouter: dispatch.SiderStore.setBreadcrumbAction,
	};
};
export default connect(mapState, mapDispatch)(withRouter(SiderCom));
