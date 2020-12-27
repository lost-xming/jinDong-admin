import Service from "./Service";
export default {
	state: {
		info: "",
		tabList: [],
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
		async updateData(params) {
			const { result = {} } = await Service.updateData(params);
			const { data } = result;
			return data;
		},
		async getData(params) {
			const { result = {} } = await Service.getData(params);
			const { data } = result;
			return data;
		},
	}),
};
