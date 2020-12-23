export default {
	state: {
		list: ["https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"],
	},
	reducers: {
		setStateData(state, data) {
			return { ...state, ...data };
		},
	},
	effects: (dispatch) => ({
		async setListData(params) {
			this.setStateData(params);
		},
	}),
};
