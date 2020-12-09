export const selectActiveRouterPath = (routerArr, pathname, brandArr) => {
	return routerArr.filter((item) => {
		if (item.path === pathname) {
			brandArr.push(item);
			return true;
		} else if (item.children && item.children.length) {
			const hasArr = selectActiveRouterPath(item.children, pathname, brandArr);
			if (hasArr && hasArr.length) {
				brandArr.push(item);
			}
			return !!hasArr.length;
		} else {
			return false;
		}
	});
};
