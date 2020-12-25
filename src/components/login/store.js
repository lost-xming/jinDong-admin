import Service from "./Service";
export default {
	state: {},
	reducers: {
		setStateData(state, data) {
			return { ...state, ...data };
		},
	},
	effects: (dispatch) => ({
		async getData(params) {
			const { result = {} } = await Service.getData(params);
			return result;
		},
	}),
};
