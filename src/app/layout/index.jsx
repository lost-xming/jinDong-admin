import React, { forwardRef, Component } from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import HeaderCom from "@/components/header";
import { withRouter } from "react-router";
import Sider from "@/components/sider";
import Breadcrumb from "@/components/breadcrumb";
import { GET } from "@/axios";
import "./index.css";

const { Content } = Layout;
class LayoutCom extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		// GET("http://baidu.com");
	}
	render() {
		const { location, children } = this.props;
		const { pathname } = location;
		return (
			<Layout style={{ height: "100vh", overflow: "hidden" }}>
				<Sider />
				<Layout className="site-layout">
					<HeaderCom />
					<Breadcrumb key={pathname} />
					<Content className="site-layout-content">{children}</Content>
				</Layout>
			</Layout>
		);
	}
}
const mapState = (state = {}) => {
	return {};
};
const mapDispatch = (dispatch) => {
	return {};
};

export default connect(mapState, mapDispatch)(withRouter(LayoutCom));
