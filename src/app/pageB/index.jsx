import React from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { Input, Button, Modal, Image, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { GET } from "../../axios/index";
import "./index.less";

class PageB extends React.Component {
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
		this.props.setTabListData({ tabList: list });
	};

	onSaveAction = () => {
		const { tabList, updateData } = this.props;
		updateData({
			list: tabList,
		}).then((data) => {
			if (data) {
				message.success("提交成功");
			}
		});
	};

	onAddAction = (index) => {
		const newTabList = [...this.props.tabList];
		newTabList[index].arr.push({
			url: "",
			name: "",
		});
		this.props.setTabListData({ tabList: newTabList });
	};
	onRemoveAction = (index, ind) => {
		const newTabList = [...this.props.tabList];
		newTabList[index].arr.splice(ind, 1);
		this.props.setTabListData({ tabList: newTabList });
	};
	onInputChange = (index, ind, k, e) => {
		const newTabList = [...this.props.tabList];
		newTabList[index].arr[ind][k] = e.target.value;
		this.props.setTabListData({ tabList: newTabList });
	};
	onTitleInputChange = (index, e) => {
		const newTabList = [...this.props.tabList];
		newTabList[index].title = e.target.value;
		this.props.setTabListData({ tabList: newTabList });
	};
	onAddCardAction = () => {
		const newTabList = [...this.props.tabList];
		newTabList.push({
			title: "",
			arr: [
				{
					url: "",
					name: "",
				},
			],
		});
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
						src="https://jd-buc-img.oss-cn-shenzhen.aliyuncs.com/footer.png "
					/>
				</div>
			),
		});
	};
	render() {
		const { tabList } = this.props;
		if (!tabList.length) {
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
				<div className="pageb">
					{tabList.map((item, index) => {
						return (
							<div key={`pageB-${index}`} className="page-card-box">
								<div className="pageb-header">
									<span>{`页脚模块${index + 1}`}</span>
									<div className="pageb-item-btn-box">
										{index === tabList.length - 1 ? (
											<Button
												className="pageb-card-btn"
												type="primary"
												onClick={this.onAddCardAction}
											>
												新 增
											</Button>
										) : null}
										{tabList.length === 1 ? null : (
											<Button
												className="pageb-card-btn"
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
								<div className="pageb-item">
									<div className="pageb-item-left">标题：</div>
									<Input
										className="footer-inp"
										maxLength={6}
										placeholder="请输入"
										defaultValue={item.title}
										onChange={(e) => {
											this.onTitleInputChange(index, e);
										}}
									/>
								</div>
								<div>
									{item.arr.length &&
										item.arr.map((it, ind) => {
											return (
												<div className="item-box" key={`item-${ind}`}>
													<div className="pageb-item">
														<div className="pageb-item-left">名称：</div>
														<Input
															onChange={(e) => {
																this.onInputChange(index, ind, "name", e);
															}}
															className="footer-inp"
															maxLength={10}
															defaultValue={it.name}
															placeholder="请输入"
														/>
													</div>
													<div className="pageb-item">
														<div className="pageb-item-left">链接：</div>
														<Input
															onChange={(e) => {
																this.onInputChange(index, ind, "url", e);
															}}
															defaultValue={it.url}
															className="footer-inp"
															placeholder="请输入"
														/>
													</div>
													<div className="pageb-item pageb-item-btn-box">
														{ind === item.arr.length - 1 ? (
															<Button
																className="pageb-item-btn"
																type="primary"
																onClick={() => this.onAddAction(index)}
															>
																新 增
															</Button>
														) : null}
														{item.arr.length === 1 ? null : (
															<Button
																className="pageb-item-btn"
																danger
																type="primary"
																onClick={() => {
																	this.onRemoveAction(index, ind);
																}}
															>
																删 除
															</Button>
														)}
													</div>
												</div>
											);
										})}
								</div>
								<div className="tip-txet">
									例如：http://www.jddianqi.cn/home 时，只需设置 ‘/home’即可
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
		setTabListData: dispatch.pageB.setTabListData,
		updateData: dispatch.pageB.updateData,
		getData: dispatch.pageB.getData,
	};
};
const mapState = (state) => {
	return {
		tabList: state.pageB.tabList,
	};
};
export default connect(mapState, mapDispatch)(PageB);
