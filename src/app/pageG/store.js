export default {
	state: {
		tabList: [
			{
				url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				link: "",
				title: "Europe Street beat",
				desc: "www.instagram.com",
			},
		],
	},
	reducers: {
		setStateData(state, data) {
			return { ...state, ...data };
		},
	},
	effects: (dispatch) => ({
		async setTabListData(params) {
			this.setStateData(params);
		},
	}),
};
