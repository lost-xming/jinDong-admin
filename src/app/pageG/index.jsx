import React from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { Form, Input, Button, Modal, Image, Upload, Card } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { GET } from "../../axios/index";
import "./index.less";
const { TextArea } = Input;
const { Meta } = Card;
const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 16 },
};
class PageG extends React.Component {
	static propTypes = {
		tabList: Proptypes.array,
		setTabListData: Proptypes.func,
	};
	static defaultProps = {
		tabList: [],
		setTabListData: () => {},
	};
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.initData();
	}
	initData = async () => {};
	onFinish = (values) => {
		console.log("Success:", values);
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
						src="https://jd-buc-img.oss-cn-shenzhen.aliyuncs.com/news.png"
					/>
				</div>
			),
		});
	};
	render() {
		const { tabList } = this.props;
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
												style={{ width: 150 }}
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
														文章链接：
													</div>
													<Input
														value={item.link}
														onChange={(e) =>
															this.setCardInput(e, index, "link")
														}
														className="footer-inp"
													/>
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
					</Form>
				</div>
			</div>
		);
	}
}

const mapDispatch = (dispatch) => {
	return {
		setTabListData: dispatch.pageG.setTabListData,
	};
};
const mapState = (state) => {
	return {
		info: state.pageG.info,
		tabList: state.pageG.tabList,
	};
};
export default connect(mapState, mapDispatch)(PageG);
