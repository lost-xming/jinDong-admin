import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import { ConfigProvider, message } from "antd";
// import "antd/dist/antd.css";
import "./index.less";
import zhCN from "antd/es/locale/zh_CN";
// Provider是react-redux两个核心工具之一，作用：将store传递到每个项目中的组件中
import { Provider } from "react-redux";
// 引入创建好的store实例
import store from "@/store/index.js";
// message全局配置
message.config({
	top: "45%",
	duration: 3,
	maxCount: 1,
});
ReactDOM.render(
	<ConfigProvider locale={zhCN}>
		<Provider store={store}>
			<App />
		</Provider>
	</ConfigProvider>,
	document.getElementById("root")
);
