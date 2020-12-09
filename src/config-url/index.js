const CONFIG = {
	development: {
		targetUrl: "https://pmerchant-dev.bthome.com",
		apiUrl: "http://framework.bnq.com.cn:8018",
		apiUrlFilter: "/merchantPcApi",
		proxyFilter: "/merchantPcApi",
		imUrl: "https:///pt-dev.bthome.com/appApi/apis",
		port: 8018,
		autoOpenBrowser: true,
	},
	prodDev: {
		apiUrl: "https://pmerchant-dev.bthome.com",
		apiUrlFilter: "/merchantPcApi",
		imUrl: "https:///pt-dev.bthome.com/appApi/apis",
	},
	test: {
		apiUrl: "https://pmerchant-test.bthome.com",
		apiUrlFilter: "/merchantPcApi",
		imUrl: "https:///pt-test.bthome.com/appApi/apis",
	},
	production: {
		apiUrl: "https://pmerchant.bthome.com",
		apiUrlFilter: "/merchantPcApi",
		imUrl: "https:///pt.bthome.com/appApi/apis",
	},
};
export default CONFIG;
