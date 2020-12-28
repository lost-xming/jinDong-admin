import React from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { Input, Button, Modal, Image, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { GET } from "../../axios/index";
import { apiUrl } from "@/config-url/config";
import "./index.less";
const { Dragger } = Upload;
class PageC extends React.Component {
	static propTypes = {
		tabList: Proptypes.array,
		setTabListData: Proptypes.func,
		updateData: Proptypes.func,
		getData: Proptypes.func,
	};
	static defaultProps = {
		tabList: [],
		setTabListData: () => {},
		updateData: () => {},
		getData: () => {},
	};
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.initData();
	}
	initData = async () => {
		const { getData } = this.props;
		const data = await getData();
		const { list } = data;
		if (list.length) {
			this.props.setTabListData({ tabList: list });
		}
	};
	onAddCardAction = () => {
		const newTabList = [...this.props.tabList];
		newTabList.push([]);
		this.props.setTabListData({ tabList: newTabList });
	};
	onRemoveCardAction = (index) => {
		const newTabList = [...this.props.tabList];
		newTabList.splice(index, 1);
		this.props.setTabListData({ tabList: newTabList });
	};

	_renderModal = () => {
		Modal.info({
			title: "案例图片",
			content: (
				<div>
					<Image
						width={200}
						src="https://jd-buc-img.oss-cn-shenzhen.aliyuncs.com/indexExp.png"
					/>
				</div>
			),
		});
	};
	handleChange = ({ fileList }, index) => {
		const newTabList = [...this.props.tabList];
		newTabList[index] = fileList;
		this.props.setTabListData({ tabList: newTabList });
	};
	onSaveAction = () => {
		const { updateData, tabList } = this.props;
		const newData = [];
		tabList.map((item) => {
			if (item.length) {
				const lastItem = item[item.length - 1];
				if (
					lastItem.url ||
					(lastItem.response &&
						lastItem.response.data &&
						lastItem.response.data.imageUrl)
				) {
					newData.push([lastItem]);
				}
			}
			return null;
		});
		updateData({
			list: newData,
		}).then((data) => {
			if (data) {
				message.success("提交成功");
			}
		});
	};
	render() {
		const { tabList } = this.props;
		const props = {
			name: "avatar",
			action: `${apiUrl}/uploadOss`,
			headers: { timeout: 600 * 1000 },
		};
		return (
			<div className="content-box">
				<div className="tip-header">
					<span className="tip-txet">建议：视频和图片交替错开</span>
					<Button type="link" onClick={this._renderModal}>
						案例图片
					</Button>
				</div>
				<div>
					{tabList.map((item, index) => {
						return (
							<div key={`pageB-${index}`} className="page-card-box">
								<div className="pagec-header">
									<span>{`模块${index + 1}`}</span>
									<div className="pagec-item-btn-box">
										{index === tabList.length - 1 ? (
											<Button
												className="pagec-card-btn"
												type="primary"
												onClick={this.onAddCardAction}
											>
												新 增
											</Button>
										) : null}
										{tabList.length === 1 ? null : (
											<Button
												className="pagec-card-btn"
												danger
												type="primary"
												onClick={() => {
													this.onRemoveCardAction(index);
												}}
											>
												删 除
											</Button>
										)}
									</div>
								</div>
								<div className="pagec-item">
									<Dragger
										{...props}
										className="item-dragger"
										fileList={item}
										onChange={(info) => {
											this.handleChange(info, index);
										}}
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
								</div>
							</div>
						);
					})}
					<Button type="primary" onClick={this.onSaveAction}>
						提 交
					</Button>
				</div>
			</div>
		);
	}
}

const mapDispatch = (dispatch) => {
	return {
		setTabListData: dispatch.pageC.setTabListData,
		updateData: dispatch.pageC.updateData,
		getData: dispatch.pageC.getData,
	};
};
const mapState = (state) => {
	return {
		tabList: state.pageC.tabList,
	};
};
export default connect(mapState, mapDispatch)(PageC);
