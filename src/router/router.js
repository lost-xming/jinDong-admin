import Home from "@/app/home";
import PageA from "@/app/pageA";
import PageB from "@/app/pageB";
import PageC from "@/app/pageC";
import PageD from "@/app/pageD";
import PageE from "@/app/pageE";
import PageF from "@/app/pageF";
// import PageG from "@/app/pageG";
import PageH from "@/app/pageH";
import PageI from "@/app/pageI";
import PageJ from "@/app/pageJ";
import NotFound from "@/app/404";
import Login from "@/app/login";
export const appRouters = [
	{
		exact: true,
		path: "/",
		iconType: "BankOutlined",
		hasNotShow: true,
		component: Home,
	},
	{
		path: "/upload",
		title: "图片上传",
		iconType: "BankOutlined",
		component: PageH,
	},
	{
		path: "/news",
		title: "新闻中心",
		iconType: "BankOutlined",
		children: [
			{
				path: "/news/list",
				title: "新闻列表",
				iconType: "BookOutlined",
				component: PageI,
			},
			{
				path: "/news/detail/:id",
				title: "新闻详情",
				hasNotShow: true,
				iconType: "BookOutlined",
				component: PageJ,
			},
		],
	},
	{
		path: "/www",
		title: "PC站管理",
		iconType: "BankOutlined",
		children: [
			{
				path: "/www/header",
				title: "公共页头管理",
				iconType: "BookOutlined",
				component: PageA,
			},
			{
				path: "/www/footer",
				title: "公共页脚管理",
				iconType: "BookOutlined",
				component: PageB,
			},
			{
				path: "/www/detail",
				title: "首页管理",
				iconType: "BookOutlined",
				component: PageC,
			},
			{
				path: "/www/product",
				title: "产品中心页管理",
				iconType: "BookOutlined",
				component: PageD,
			},
			{
				path: "/www/introduction",
				title: "了解锦东页管理",
				iconType: "BookOutlined",
				component: PageE,
			},
			{
				path: "/www/info",
				title: "公司简介页管理",
				iconType: "BookOutlined",
				component: PageF,
			},
			// {
			// 	path: "/www/news",
			// 	title: "新闻中心页管理",
			// 	iconType: "BookOutlined",
			// 	component: PageG,
			// },
		],
	},
	{
		path: "/m",
		title: "M站管理",
		iconType: "CarryOutOutlined",
		children: [
			{
				path: "/m/home",
				title: "首页管理",
				iconType: "BookOutlined",
				component: PageA,
			},
			{
				path: "/m/news",
				title: "新闻页管理",
				iconType: "BookOutlined",
				component: PageB,
			},
		],
	},
];
export const configRouters = [
	{
		path: "/404",
		title: "404",
		component: NotFound,
	},
	{
		path: "/login",
		title: "login",
		component: Login,
	},
];
