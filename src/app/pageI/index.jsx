import React from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { withRouter } from "react-router";
import { Form, Input, Button, Modal, Image, Upload, List, Avatar } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { GET } from "../../axios/index";
import "./index.less";
const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 16 },
};
class PageI extends React.Component {
	static propTypes = {
		list: Proptypes.array,
		getListData: Proptypes.func,
	};
	static defaultProps = {
		list: [],
		getListData: () => {},
	};
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.initData();
	}
	initData = () => {
		const { getListData } = this.props;
		getListData();
	};
	onGoToDetail = (item) => {
		this.props.history.push(`/news/detail/${item.id}`);
	};
	addNewsAction = () => {
		this.props.history.push(`/news/detail/add`);
	};
	render() {
		const { list } = this.props;
		return (
			<div className="content-box">
				<div className="tip-header">
					<Button type="primary" onClick={this.addNewsAction}>
						新增文章
					</Button>
				</div>
				<div>
					<List
						itemLayout="horizontal"
						dataSource={list}
						renderItem={(item) => (
							<List.Item
								className="news-item"
								onClick={() => this.onGoToDetail(item)}
							>
								<List.Item.Meta
									avatar={<Avatar src={item.url} />}
									title={item.name}
									description={item.miaoshu}
								/>
							</List.Item>
						)}
					/>
				</div>
			</div>
		);
	}
}

const mapDispatch = (dispatch) => {
	return {
		getListData: dispatch.pageI.getListData,
	};
};
const mapState = (state) => {
	return {
		list: state.pageI.list,
	};
};
export default connect(mapState, mapDispatch)(withRouter(PageI));
