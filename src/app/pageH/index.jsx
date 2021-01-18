import React from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import {
	Form,
	Input,
	Button,
	Modal,
	Image,
	Upload,
	List,
	Avatar,
	Table,
} from "antd";
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
		getData: Proptypes.func,
	};
	static defaultProps = {
		list: [],
		setListData: () => {},
		getData: () => {},
	};
	constructor(props) {
		super(props);
		this.state = {
			fileList: [],
			pageNum: 1,
			total: 0,
			pageSize: 10,
			tableColumns: [
				{
					title: "图片",
					dataIndex: "src",
					render: (text, record) => {
						return <Image src={text} width={50} />;
					},
				},
				{
					title: "url",
					dataIndex: "src",
				},
			],
		};
	}
	componentDidMount() {
		this.initData(1);
	}
	initData = async (page) => {
		const { total, pageNum } = await this.props.getData({ pageNum: page });
		this.setState({
			pageNum,
			total,
		});
	};
	onPageChange = (page) => {
		this.setState(
			{
				pageNum: page,
			},
			() => {
				this.initData(page);
			}
		);
	};
	handleChange = ({ fileList, file }) => {
		const newArr = [...this.props.list];
		if (file.status === "done") {
			newArr.unshift({ src: file.response.data.imageUrl.url });
			this.props.setListData({ list: newArr });
		}
		this.setState({ fileList });
	};
	render() {
		const { fileList, tableColumns, pageNum, total } = this.state;
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
					</Dragger>
					<h1 style={{ paddingTop: 10, paddingBottom: 10 }}>图片或视频链接</h1>
					<Table
						columns={tableColumns}
						dataSource={list}
						rowKey={(record, index) => `table_${index}`}
						pagination={{
							current: pageNum,
							pageSize: 10,
							total,
							showTotal: (totalNum) => <span>共{totalNum}条</span>,
							onChange: this.onPageChange,
						}}
					/>
				</div>
			</div>
		);
	}
}

const mapDispatch = (dispatch) => {
	return {
		setListData: dispatch.pageH.setListData,
		getData: dispatch.pageH.getData,
	};
};
const mapState = (state) => {
	return {
		list: state.pageH.list,
	};
};
export default connect(mapState, mapDispatch)(PageH);
