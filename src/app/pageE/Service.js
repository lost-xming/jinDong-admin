import { GET, POST } from "@/axios";
import CommonService from "@/store/CommonService";
import { apiUrl } from "@/config-url/config";
class Service extends CommonService {
	/**
	 *
	 * @param {跟新数据} params
	 */
	updateData(params) {
		return POST(`${apiUrl}/update/introduction`, params);
	}
	getData(params) {
		return GET(`${apiUrl}/introduction`, params);
	}
}

export default new Service();
