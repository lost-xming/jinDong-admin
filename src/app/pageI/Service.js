import { GET, POST } from "@/axios";
import CommonService from "@/store/CommonService";
import { apiUrl } from "@/config-url/config";
class Service extends CommonService {
	getListData(params) {
		return GET(`${apiUrl}/news/list`, params);
	}
}

export default new Service();
