import React from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { Input, Button, Modal, Image, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { apiUrl } from "@/config-url/config";
import "./index.less";
const { Dragger } = Upload;
class PageD extends React.Component {
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
	onSaveAction = () => {
		const { updateData, tabList } = this.props;
		const newData = [];
		tabList.map((item) => {
			if (item.length === 1) {
				const lastItem = item[item.length - 1];
				if (
					lastItem.url ||
					(lastItem.response &&
						lastItem.response.data &&
						lastItem.response.data.imageUrl)
				) {
					newData.push([lastItem]);
				}
			} else if (item.length > 1) {
				if (item[item.length - 2].type === item[item.length - 1].type) {
					newData.push([item[item.length - 2], item[item.length - 1]]);
				} else {
					newData.push([item[item.length - 1]]);
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
	render() {
		const { tabList } = this.props;
		const props = {
			name: "avatar",
			action: `${apiUrl}/uploadOss`,
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
								<div className="paged-header">
									<span>{`模块${index + 1}`}</span>
									<div className="paged-item-btn-box">
										{index === tabList.length - 1 ? (
											<Button
												className="paged-card-btn"
												type="primary"
												onClick={this.onAddCardAction}
											>
												新 增
											</Button>
										) : null}
										{tabList.length === 1 ? null : (
											<Button
												className="paged-card-btn"
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
								<div className="paged-item">
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
											默认展示最后一条，当最后两条上传内容都为图片时，展示两张图片(横排平铺方式)
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
		setTabListData: dispatch.pageD.setTabListData,
		updateData: dispatch.pageD.updateData,
		getData: dispatch.pageD.getData,
	};
};
const mapState = (state) => {
	return {
		tabList: state.pageD.tabList,
	};
};
export default connect(mapState, mapDispatch)(PageD);
