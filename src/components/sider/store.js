export default {
	state: {
		// 左侧导航 是否展开或者收起
		collapsed: false,
		breadcrumb: [],
	},
	reducers: {
		setBreadcrumb(state, data) {
			return { ...state, breadcrumb: data };
		},
		setCollapsed(state, data) {
			return { ...state, collapsed: data };
		},
	},
	effects: (dispatch) => ({
		async setBreadcrumbAction(params, state) {
			this.setBreadcrumb(params);
		},
		async setCollapsedAction(params, state) {
			// state， 可获取组件state 值
			this.setCollapsed(params);
		},
	}),
};
