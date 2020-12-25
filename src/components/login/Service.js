import { GET, POST } from "@/axios";
import CommonService from "@/store/CommonService";
import { apiUrl } from "@/config-url/config";
class Service extends CommonService {
	getData(params) {
		console.log(11111);
		return POST(`${apiUrl}/userInfo`, params);
	}
}

export default new Service();
