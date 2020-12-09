import React from "react";
import { Breadcrumb } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { appRouters } from "@/router/router";
import { selectActiveRouterPath } from "@/utils";
import "./index.css";
class BreadcrumbCom extends React.Component {
	static propTypes = {
		setBreadRouter: PropTypes.func,
	};
	static defaultProps = {
		setBreadRouter: () => {},
	};
	constructor(props) {
		super(props);
		this.state = {
			newBrandArr: [],
		};
	}
	componentDidMount() {
		const newBrandArr = this.getBrandArr();
		this.setState({
			newBrandArr,
		});
	}
	getBrandArr = () => {
		const { location } = this.props;
		const { pathname } = location;
		const brandArr = [];
		selectActiveRouterPath(appRouters, pathname, brandArr);
		const newBrandArr = (brandArr && brandArr.reverse()) || [];
		this.setDispatchRouter(newBrandArr);
		return newBrandArr;
	};
	setDispatchRouter = (newBrandArr) => {
		const { setBreadRouter } = this.props;
		// 保存选中的项 导航信息,传递给sider 作为展开项
		// 获取path
		const pathArr = [];
		newBrandArr.map((item) => {
			if (item.path && item.children) {
				pathArr.push(item.path);
			}
			return null;
		});
		setBreadRouter(pathArr);
	};
	render() {
		const { newBrandArr } = this.state;
		return (
			<div className="site-layout-bread">
				<Breadcrumb>
					{newBrandArr.map((item, index) => {
						if (!item.redirect) {
							return (
								<Breadcrumb.Item key={item.path}>
									{index !== newBrandArr.length - 1 && (
										<Link to={item.path}>{item.title}</Link>
									)}
									{index === newBrandArr.length - 1 && item.title}
								</Breadcrumb.Item>
							);
						}
					})}
				</Breadcrumb>
			</div>
		);
	}
}

const mapState = (state = {}) => {
	return {};
};
const mapDispatch = (dispatch) => {
	return {
		setBreadRouter: dispatch.SiderStore.setBreadcrumbAction,
	};
};
export default connect(mapState, mapDispatch)(withRouter(BreadcrumbCom));
