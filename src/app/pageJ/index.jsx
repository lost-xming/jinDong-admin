import React from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { Form, Input, Button, Modal, Image, Upload, Card, message } from "antd";
import { withRouter } from "react-router";
import "./index.less";
const { TextArea } = Input;
const { Meta } = Card;
const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 16 },
};
class PageJ extends React.Component {
	static propTypes = {
		addData: Proptypes.func,
		getData: Proptypes.func,
		updateData: Proptypes.func,
	};
	static defaultProps = {
		addData: () => {},
		getData: () => {},
		updateData: () => {},
	};
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			url: "",
			name: "",
			miaoshu: "",
			timer: "",
			info: "",
		};
	}
	componentDidMount() {
		this.initData();
	}
	initData = async () => {
		const { match } = this.props;
		const { params } = match;
		const { id } = params;
		if (id !== "add" && id) {
			const data = await this.props.getData({ id });
			this.setState({
				...data,
				id,
			});
		}
	};
	onSaveAction = () => {
		const { name, miaoshu, url, info, timer, id } = this.state;
		const { addData, updateData } = this.props;
		if (id && id !== "add") {
			updateData({
				name,
				miaoshu,
				url,
				info,
				timer,
				id,
			}).then((data) => {
				if (data) {
					message.success("更新成功");
				}
			});
		} else {
			addData({
				name,
				miaoshu,
				url,
				timer,
				info,
			}).then((data) => {
				if (data) {
					message.success("新增成功");
				}
			});
		}
	};
	setCardInput = (e, k) => {
		this.setState({
			[k]: e.target.value,
		});
	};
	render() {
		const { name, miaoshu, url, info, timer } = this.state;
		return (
			<div className="content-box">
				<h2 className="tip-header">新闻详情</h2>
				<div className="pagej">
					<div className="pageJ-cards">
						<div className="pageJ-card-item">
							<div>
								<Card
									hoverable
									style={{ width: 200 }}
									cover={<img alt="example" src={url} />}
								>
									<Meta title={name} description={miaoshu} />
								</Card>
							</div>
							<div className="pageJ-card-item-right">
								<div className="pageJ-card-item-right-line">
									<div className="pageJ-card-item-right-line-title">
										封面图片：
									</div>
									<div>
										<Input
											value={url}
											onChange={(e) => this.setCardInput(e, "url")}
											className="footer-inp"
											placeholder="请输入"
										/>
										<div className="pageJ-tip-txet">
											封面图 可在图片上传中上传图片获取图片url
										</div>
									</div>
								</div>
								<div className="pageJ-card-item-right-line">
									<div className="pageJ-card-item-right-line-title">主题：</div>
									<Input
										value={name}
										onChange={(e) => this.setCardInput(e, "name")}
										className="footer-inp"
										placeholder="请输入"
									/>
								</div>
								<div className="pageJ-card-item-right-line">
									<div className="pageJ-card-item-right-line-title">描述：</div>
									<Input
										value={miaoshu}
										onChange={(e) => this.setCardInput(e, "miaoshu")}
										className="footer-inp"
										placeholder="请输入"
									/>
								</div>
								<div className="pageJ-card-item-right-line">
									<div className="pageJ-card-item-right-line-title">
										创作时间：
									</div>
									<Input
										value={timer}
										onChange={(e) => this.setCardInput(e, "timer")}
										className="footer-inp"
										placeholder="默认时间为此时"
									/>
								</div>
								<div className="pageJ-card-item-right-line">
									<div className="pageJ-card-item-right-line-title">内容：</div>
									<TextArea
										className="footer-inp"
										autoSize={{ minRows: 10, maxRows: 30 }}
										value={info}
										onChange={(e) => this.setCardInput(e, "info")}
										placeholder="请输入"
									/>
								</div>
								<div className="pageJ-card-item-right-line">
									<div className="pageJ-card-item-right-line-title" />
									<Button type="primary" onClick={this.onSaveAction}>
										提 交
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatch = (dispatch) => {
	return {
		addData: dispatch.pageJ.addData,
		getData: dispatch.pageJ.getData,
		updateData: dispatch.pageJ.updateData,
	};
};
const mapState = (state) => {
	return {};
};
export default connect(mapState, mapDispatch)(withRouter(PageJ));
