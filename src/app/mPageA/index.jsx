import React from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { Form, Input, Button, Card, message, Modal, Image } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "./index.less";
function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result));
	reader.readAsDataURL(img);
}
function beforeUpload(file) {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!");
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error("Image must smaller than 2MB!");
	}
	return isJpgOrPng && isLt2M;
}
const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 6 },
};

class MPageA extends React.Component {
	static propTypes = {
		updateData: Proptypes.func,
		getData: Proptypes.func,
	};
	static defaultProps = {
		updateData: () => {},
		getData: () => {},
	};
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			tabList: [
				{
					uid: "-1",
					name: "",
					status: "",
					url: "",
					title: "",
				},
			],
			initData: {},
		};
	}
	componentDidMount() {
		this.initData();
	}
	initData = async () => {
		const data = await this.props.getData();
		this.setState({
			tabList: data.pic,
			initData: data,
		});
	};

	handleChange = (info, index) => {
		if (info.file.status === "uploading") {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === "done") {
			const newTabList = [...this.state.tabList];
			newTabList[index].url = info.file.response.data.imageUrl;
			getBase64(info.file.originFileObj, (imageUrl) =>
				this.setState({
					tabList: newTabList,
					loading: false,
				})
			);
		}
	};
	onFinish = (values) => {
		const { updateData } = this.props;
		updateData(values).then((data) => {
			if (data) {
				message.success("提交成功");
			}
		});
	};

	onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	onTitleChange = (e, index) => {
		const tabList = [...this.state.tabList];
		tabList[index].title = e.target.value;
		this.setState({
			tabList,
		});
	};
	onDeleteAction = (index) => {
		const newTabList = [...this.state.tabList];
		newTabList.splice(index, 1);
		this.setState({
			tabList: newTabList,
		});
	};
	onAddACtion = () => {
		const newTabList = [...this.state.tabList];
		newTabList.push({
			uid: "-1",
			name: "",
			status: "",
			url: "",
			title: "",
		});
		this.setState({
			tabList: newTabList,
		});
	};
	_renderModal = () => {
		Modal.info({
			title: "案例图片",
			content: (
				<div>
					<Image
						width={200}
						src="https://jd-buc-img.oss-cn-shenzhen.aliyuncs.com/mheader.png"
					/>
				</div>
			),
		});
	};
	render() {
		const { initData } = this.state;
		if (JSON.stringify(initData) === "{}") {
			return null;
		}
		return (
			<div className="content-box">
				<div className="tip-header">
					<span className="tip-txet">建议：文字长度小于10</span>
					<Button type="link" onClick={this._renderModal}>
						案例图片
					</Button>
				</div>
				<Form
					{...layout}
					name="basic"
					onFinish={this.onFinish}
					initialValues={initData}
					onFinishFailed={this.onFinishFailed}
				>
					<Form.Item
						label="首页"
						name="indexName"
						rules={[{ required: true, message: "请输入正确的名称!" }]}
					>
						<Input maxLength={10} placeholder="请输入" />
					</Form.Item>
					<Form.Item
						label="产品中心"
						name="product"
						rules={[{ required: true, message: "请输入正确的名称!" }]}
					>
						<Input maxLength={10} placeholder="请输入" />
					</Form.Item>
					<Form.Item
						label="了解锦东"
						name="introduction"
						rules={[{ required: true, message: "请输入正确的名称!" }]}
					>
						<Input maxLength={10} placeholder="请输入" />
					</Form.Item>
					<Form.Item
						label="公司简介"
						name="info"
						rules={[{ required: true, message: "请输入正确的名称!" }]}
					>
						<Input maxLength={10} placeholder="请输入" />
					</Form.Item>
					<Form.Item
						label="新闻中心"
						name="news"
						rules={[{ required: true, message: "请输入正确的名称!" }]}
					>
						<Input maxLength={10} placeholder="请输入" />
					</Form.Item>
					<Button className="index-save-btn" htmlType="submit" type="primary">
						保 存
					</Button>
				</Form>
			</div>
		);
	}
}

const mapDispatch = (dispatch) => {
	return {
		updateData: dispatch.mPageA.updateData,
		getData: dispatch.mPageA.getData,
	};
};
const mapState = (state) => {
	return {};
};
export default connect(mapState, mapDispatch)(MPageA);
