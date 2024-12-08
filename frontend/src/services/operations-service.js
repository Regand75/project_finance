import {HttpUtils} from "../utils/http-utils.js";
import config from "../../config/config.js";

export class OperationsService {
    static async getOperations(params = '') {
        const result = await HttpUtils.request(config.host + '/operations' + params);
        if (result.error || !result) {
            return alert('Возникла ошибка при запросе операций. Обратитесь в поддержку');
        }
        return result;
    }
}