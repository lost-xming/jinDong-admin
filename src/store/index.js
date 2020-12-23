import { init } from "@rematch/core";
import Common from "./common";
import SiderStore from "@/components/sider/store";
import Login from "@/app/login/store";
import pageA from "@/app/pageA/store";
import pageB from "@/app/pageB/store";
import pageC from "@/app/pageC/store";
import pageD from "@/app/pageD/store";
import pageE from "@/app/pageE/store";
import pageF from "@/app/pageF/store";
import pageG from "@/app/pageG/store";
import pageH from "@/app/pageH/store";
import pageI from "@/app/pageI/store";
import pageJ from "@/app/pageJ/store";
const store = init({
	models: {
		Common,
		SiderStore,
		Login,
		pageA,
		pageB,
		pageC,
		pageD,
		pageE,
		pageF,
		pageG,
		pageH,
		pageI,
		pageJ,
	},
});

export default store;
