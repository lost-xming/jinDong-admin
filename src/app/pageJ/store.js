import Service from "./Service";
export default {
	state: {},
	reducers: {
		setStateData(state, data) {
			return { ...state, ...data };
		},
	},
	effects: (dispatch) => ({
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
		async addData(params) {
			const { result = {} } = await Service.addData(params);
			const { data } = result;
			return data;
		},
	}),
};
