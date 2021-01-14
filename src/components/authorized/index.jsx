import { connect } from "react-redux";
const Authorized = (props) => {
	const { children, userInfo, authority, noMatch, login } = props;
	const userInfoData = Object.assign(
		{},
		userInfo,
		JSON.parse(localStorage.getItem("userInfo"))
	);
	const { currentAuthority } = userInfoData;
	// if (!currentAuthority) return login;
	if (!authority) return children;
	const _authority = Array.isArray(authority) ? authority : [authority];
	if (_authority.includes(currentAuthority)) return children;
	return noMatch;
};
const mapState = (state = {}) => {
	return {
		userInfo: state.Common.userInfo,
	};
};
export default connect(mapState)(Authorized);
