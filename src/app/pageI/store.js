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
		async getListData(params) {
			const { result = {} } = await Service.getListData(params);
			const { data } = result;
			this.setStateData({
				list: data,
			});
			return data;
		},
	}),
};
