import React from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { Form, Input, Button, Modal, Image, Upload, List, Avatar } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { GET } from "../../axios/index";
import "./index.less";
const { Dragger } = Upload;
const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 16 },
};
class PageH extends React.Component {
	static propTypes = {
		list: Proptypes.array,
		setListData: Proptypes.func,
	};
	static defaultProps = {
		list: [],
		setListData: () => {},
	};
	constructor(props) {
		super(props);
		this.state = {
			fileList: [],
		};
	}
	componentDidMount() {
		this.initData();
	}
	initData = async () => {};
	handleChange = ({ fileList, file }) => {
		const newArr = [...this.props.list];
		if (file.status === "done") {
			newArr.unshift(file.response.data.imageUrl);
			this.props.setListData({ list: newArr });
		}
		this.setState({ fileList });
	};
	render() {
		const { fileList } = this.state;
		const { list } = this.props;
		const props = {
			name: "avatar",
			action: "http://sever.jddianqi.cn/admin/uploadOss",
		};
		return (
			<div className="content-box">
				<div className="tip-header">
					<span className="tip-txet">排序顺序为倒序，最近上传的在最顶部</span>
				</div>
				<div>
					<Dragger
						{...props}
						className="item-dragger"
						fileList={fileList}
						onChange={this.handleChange}
					>
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">
							单击或拖动文件到此区域以上载(图片/视频)
						</p>
						<p className="ant-upload-text">
							每个模块仅展示最后上传的一条，多传无效
						</p>
					</Dragger>
					<List
						dataSource={list}
						renderItem={(item, index) => (
							<List.Item key={`list-${index}`}>
								<div className="list-item">
									<div className="list-item-img">
										<Avatar src={item} />
									</div>
									{item}
								</div>
							</List.Item>
						)}
					>
						{this.state.loading && this.state.hasMore && (
							<div className="demo-loading-container">
								<Spin />
							</div>
						)}
					</List>
				</div>
			</div>
		);
	}
}

const mapDispatch = (dispatch) => {
	return {
		setListData: dispatch.pageH.setListData,
	};
};
const mapState = (state) => {
	return {
		list: state.pageH.list,
	};
};
export default connect(mapState, mapDispatch)(PageH);
