import { GET, POST } from "@/axios";
import CommonService from "@/store/CommonService";
import { apiUrl } from "@/config-url/config";
class Service extends CommonService {
	getData(params) {
		return GET(`${apiUrl}/imgLogs`, params);
	}
}

export default new Service();
