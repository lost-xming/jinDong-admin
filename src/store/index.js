import { init } from "@rematch/core";
import Common from "./common";
import SiderStore from "@/components/sider/store";
import Login from "@/app/login/store";
const store = init({
	models: {
		Common,
		SiderStore,
		Login,
	},
});

export default store;
