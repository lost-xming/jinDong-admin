import { init } from "@rematch/core";
import Common from "./common";
import SiderStore from "@/components/sider/store";
import login from "@/app/login/store";
import pageA from "@/app/pageA/store";
import pageB from "@/app/pageB/store";
import pageC from "@/app/pageC/store";
import pageD from "@/app/pageD/store";
import pageE from "@/app/pageE/store";
import pageF from "@/app/pageF/store";
import pageH from "@/app/pageH/store";
import pageI from "@/app/pageI/store";
import pageJ from "@/app/pageJ/store";
import mPageA from "@/app/mPageA/store";
import mPageB from "@/app/mPageB/store";
import mPageC from "@/app/mPageC/store";
import mPageD from "@/app/mPageD/store";
import mPageE from "@/app/mPageE/store";
import mPageF from "@/app/mPageF/store";
import loginCom from "@/components/login/store";
const store = init({
	models: {
		Common,
		SiderStore,
		login,
		pageA,
		pageB,
		pageC,
		pageD,
		pageE,
		pageF,
		pageH,
		pageI,
		pageJ,
		mPageA,
		mPageB,
		mPageC,
		mPageD,
		mPageE,
		mPageF,
		loginCom,
	},
});

export default store;
