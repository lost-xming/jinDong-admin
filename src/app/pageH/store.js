import Service from "./Service";
export default {
	state: {
		list: [],
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
		async getData(params) {
			const { result = {} } = await Service.getData(params);
			const { data } = result;
			this.setStateData({ list: data });
			return result;
		},
	}),
};
