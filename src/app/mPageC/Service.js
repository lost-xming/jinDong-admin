import { GET, POST } from "@/axios";
import CommonService from "@/store/CommonService";
import { apiUrl } from "@/config-url/config";
class Service extends CommonService {
	/**
	 *
	 * @param {跟新数据} params
	 */
	updateData(params) {
		return POST(`${apiUrl}/update/mhome`, params);
	}
	getData(params) {
		return GET(`${apiUrl}/mhome`, params);
	}
}

export default new Service();
