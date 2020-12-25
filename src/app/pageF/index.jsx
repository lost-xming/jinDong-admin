import React from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { Form, Input, Button, Modal, Image, Upload, Card, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "./index.less";
const { TextArea } = Input;
const { Meta } = Card;
const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 16 },
};
const redText = "<br  />";
const linkurl = "/newsInfo/";
class PageF extends React.Component {
	static propTypes = {
		info: Proptypes.string,
		tabList: Proptypes.array,
		setTabListData: Proptypes.func,
		updateData: Proptypes.func,
		getData: Proptypes.func,
	};
	static defaultProps = {
		info: "",
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
		const { news, info } = data;
		this.props.setTabListData({ info, tabList: news });
	};

	onFinish = (values) => {
		const { updateData, tabList } = this.props;
		updateData({
			info: values.info,
			news: tabList,
		}).then((data) => {
			if (data) {
				message.success("提交成功");
			}
		});
	};

	onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	onAddNewsAction = () => {
		const newData = [...this.props.tabList];
		newData.push({
			url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
			link: "",
			title: "例图",
			desc: "",
		});
		this.props.setTabListData({
			tabList: newData,
		});
	};
	onRemoveNewsAction = (index) => {
		const newData = [...this.props.tabList];
		newData.splice(index, 1);
		this.props.setTabListData({
			tabList: newData,
		});
	};
	setCardInput = (e, index, k) => {
		const newData = [...this.props.tabList];
		newData[index][k] = e.target.value;
		this.props.setTabListData({
			tabList: newData,
		});
	};
	_renderModal = () => {
		Modal.info({
			title: "案例图片",
			content: (
				<div>
					<Image
						width={200}
						src="https://jd-buc-img.oss-cn-shenzhen.aliyuncs.com/info.png"
					/>
				</div>
			),
		});
	};
	render() {
		const { info, tabList } = this.props;
		if (!info) {
			return null;
		}
		return (
			<div className="content-box">
				<div className="tip-header">
					<span className="tip-txet">建议：新闻板块个数不小于3个</span>
					<Button type="link" onClick={this._renderModal}>
						案例图片
					</Button>
				</div>
				<div>
					<Form
						{...layout}
						name="basic"
						initialValues={{ remember: true }}
						onFinish={this.onFinish}
						onFinishFailed={this.onFinishFailed}
					>
						<Form.Item
							label="公司简介"
							name="info"
							initialValue={info}
							rules={[{ required: true, message: "请输入!" }]}
						>
							<TextArea
								autoSize={{ minRows: 10, maxRows: 20 }}
								placeholder="请输入"
							/>
						</Form.Item>
						<div className="pagef-tip-txet">
							文本如果需要换行，请使用<span className="red">{redText}</span>
							进行换行
						</div>
						<Form.Item label="新闻推荐" name="tuijian">
							<div className="pagef-cards">
								{tabList.map((item, index) => {
									return (
										<div
											className="pagef-card-item"
											key={`pagef-card-${index}`}
										>
											<Card
												hoverable
												style={{ width: 200 }}
												cover={<img alt="example" src={item.url} />}
											>
												<Meta title={item.title} description={item.desc} />
											</Card>
											<div className="pagef-card-item-right">
												<div className="pagef-card-item-right-line">
													<div className="pagef-card-item-right-line-title">
														图片：
													</div>
													<Input
														value={item.url}
														onChange={(e) => this.setCardInput(e, index, "url")}
														className="footer-inp"
													/>
												</div>
												<div className="pagef-card-item-right-line">
													<div className="pagef-card-item-right-line-title">
														标题：
													</div>
													<Input
														value={item.title}
														onChange={(e) =>
															this.setCardInput(e, index, "title")
														}
														className="footer-inp"
													/>
												</div>
												<div className="pagef-card-item-right-line">
													<div className="pagef-card-item-right-line-title">
														介绍：
													</div>
													<Input
														value={item.desc}
														onChange={(e) =>
															this.setCardInput(e, index, "desc")
														}
														className="footer-inp"
													/>
												</div>
												<div className="pagef-card-item-right-line">
													<div className="pagef-card-item-right-line-title">
														链接：
													</div>
													<Input
														value={item.link}
														onChange={(e) =>
															this.setCardInput(e, index, "link")
														}
														className="footer-inp"
													/>
												</div>
												<div className="pagef-tip-txet">
													链接为固定方式：
													<span className="red">{linkurl}1</span>
													【1】为新闻id，新闻id 从新闻列表详情页查看
												</div>
												<div className="pagef-new-id">
													<Image
														width={200}
														src={
															"https://jd-buc-img.oss-cn-shenzhen.aliyuncs.com/newFindid.png"
														}
													></Image>
												</div>
												<div className="pagef-card-item-right-line pagef-card-item-right-btn">
													{index === tabList.length - 1 ? (
														<Button
															className="pagef-card-item-btn"
															type="primary"
															onClick={this.onAddNewsAction}
														>
															新 增
														</Button>
													) : null}
													{tabList.length === 1 ? null : (
														<Button
															className="pagef-card-item-btn"
															danger
															type="primary"
															onClick={() => this.onRemoveNewsAction(index)}
														>
															删 除
														</Button>
													)}
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</Form.Item>
						<Button type="primary" htmlType="submit">
							提 交
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}

const mapDispatch = (dispatch) => {
	return {
		setTabListData: dispatch.pageF.setTabListData,
		updateData: dispatch.pageF.updateData,
		getData: dispatch.pageF.getData,
	};
};
const mapState = (state) => {
	return {
		info: state.pageF.info,
		tabList: state.pageF.tabList,
	};
};
export default connect(mapState, mapDispatch)(PageF);
