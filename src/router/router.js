import Home from "@/app/home";
import PageA from "@/app/pageA";
import PageB from "@/app/pageB";
import NotFound from "@/app/404";
import Login from "@/app/login";
export const appRouters = [
	{
		exact: true,
		path: "/",
		iconType: "BankOutlined",
		title: "Home",
		hasNotShow: true,
		component: Home,
	},
	{
		path: "/home",
		title: "Home",
		iconType: "BankOutlined",
		component: Home,
		children: [
			{
				path: "/home/detail",
				title: "detail",
				iconType: "BookOutlined",
				redirect: "/home/detail/pageA",
				children: [
					{
						path: "/home/detail/pageA",
						title: "PageA",
						iconType: "ContainerOutlined",
						component: PageA,
					},
					{
						path: "/home/detail/pageB",
						title: "PageB",
						// authority: ["user", "admin"],
						iconType: "ContainerOutlined",
						component: PageB,
					},
				],
			},
			{
				path: "/home/err",
				title: "NotFound",
				hasNotShow: true,
				iconType: "VideoCameraOutlined",
				component: NotFound,
			},
		],
	},
	{
		path: "/detail",
		title: "home2",
		// authority: ["user", "admin"],
		iconType: "CarryOutOutlined",
		children: [
			{
				path: "/detail/detail",
				title: "detail2",
				iconType: "BookOutlined",
				redirect: "/detail/detail/pageA",
				children: [
					{
						path: "/detail/detail/pageA",
						title: "PageA",
						iconType: "ContainerOutlined",
						component: PageA,
					},
					{
						path: "/detail/detail/pageB",
						title: "PageB",
						iconType: "ContainerOutlined",
						component: PageB,
					},
				],
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
