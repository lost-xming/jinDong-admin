import React from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { Form, Input, Button, Card, Upload, message, Modal, Image } from "antd";
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

class PageA extends React.Component {
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
		// 合并图片数据
		const { tabList } = this.state;
		// 过滤无效的 图片和 文字
		const newList = tabList.filter((item) => item.url && item.title);
		const ajaxData = {
			...values,
			pic: newList,
		};
		updateData(ajaxData).then((data) => {
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
	_renderUploadTab = (item, index) => {
		const { loading } = this.state;
		const uploadButton = (
			<div>
				{loading ? <LoadingOutlined /> : <PlusOutlined />}
				<div style={{ marginTop: 8 }}>上传</div>
			</div>
		);

		return (
			<div className="tab-card-upload">
				<div className="tab-card-title">上传图片：</div>
				<div>
					<Upload
						name="avatar"
						listType="picture-card"
						className="avatar-uploader"
						showUploadList={false}
						action="http://sever.jddianqi.cn/admin/uploadOss"
						beforeUpload={beforeUpload}
						onChange={(info) => {
							this.handleChange(info, index);
						}}
					>
						{item.url ? (
							<img src={item.url.url} alt="avatar" style={{ width: "100%" }} />
						) : (
							uploadButton
						)}
					</Upload>
					<div className="tip-txet">建议图片尺寸1200 * 600</div>
				</div>
			</div>
		);
	};
	_renderModal = () => {
		Modal.info({
			title: "案例图片",
			content: (
				<div>
					<Image
						width={200}
						src="https://jd-buc-img.oss-cn-shenzhen.aliyuncs.com/header.png "
					/>
				</div>
			),
		});
	};
	render() {
		const { tabList, initData } = this.state;
		if (!initData.indexName) {
			return null;
		}
		return (
			<div className="content-box">
				<div className="tip-header">
					<span className="tip-txet">建议：3-5个模块，每个模块3-5条</span>
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
						<Input maxLength={6} placeholder="请输入" />
					</Form.Item>
					<Form.Item
						label="顶部悬浮窗设置"
						name="setting"
						rules={[{ required: true, message: "请输入正确的名称!" }]}
					>
						<Input maxLength={6} placeholder="请输入" />
					</Form.Item>
					<Form.Item label="上传图片" name="indexSetting-item">
						<div className="indexSetting-item">
							{tabList.map((item, index) => {
								return (
									<Card
										key={`tab-${index}`}
										className="tab-card-box"
										style={{ width: 400 }}
									>
										<div className="tab-card-name">
											<div className="tab-card-title">左侧tab名称：</div>
											<Input
												className="inputSmall"
												value={item.title}
												onChange={(e) => this.onTitleChange(e, index)}
												placeholder="输入名称"
											/>
										</div>
										{this._renderUploadTab(item, index)}
										<div className="tab-card-bottom">
											{index === tabList.length - 1 ? (
												<Button
													className="tab-card-bottom-btn"
													type="primary"
													onClick={this.onAddACtion}
												>
													新 增
												</Button>
											) : null}
											{tabList.length === 1 ? null : (
												<Button
													className="tab-card-bottom-btn"
													type="primary"
													danger
													onClick={this.onDeleteAction}
												>
													删 除
												</Button>
											)}
										</div>
									</Card>
								);
							})}
						</div>
					</Form.Item>
					<Form.Item
						label="产品中心"
						name="product"
						rules={[{ required: true, message: "请输入正确的名称!" }]}
					>
						<Input maxLength={6} placeholder="请输入" />
					</Form.Item>
					<Form.Item
						label="了解锦东"
						name="introduction"
						rules={[{ required: true, message: "请输入正确的名称!" }]}
					>
						<Input maxLength={6} placeholder="请输入" />
					</Form.Item>
					<Form.Item
						label="服务支持"
						name="news"
						rules={[{ required: true, message: "请输入正确的名称!" }]}
					>
						<Input maxLength={6} placeholder="请输入" />
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
		updateData: dispatch.pageA.updateData,
		getData: dispatch.pageA.getData,
	};
};
const mapState = (state) => {
	return {};
};
export default connect(mapState, mapDispatch)(PageA);
