export default {
	state: {
		forgetPassword: false,
	},
	reducers: {
		setForgetPassword(state, data) {
			return { ...state, forgetPassword: data };
		},
	},
	effects: (dispatch) => ({
		async setForgetPasswordAction(params, state) {
			this.setForgetPassword(params);
		},
	}),
};
