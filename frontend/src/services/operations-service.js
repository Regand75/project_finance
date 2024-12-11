import {HttpUtils} from "../utils/http-utils.js";
import config from "../../config/config.js";

export class OperationsService {

    static async getOperations(params = '') {
        const result = await HttpUtils.request(config.host + '/operations' + params);
        if (result.redirect || result.error || !result.response) {
            return alert('Возникла ошибка при запросе операций. Обратитесь в поддержку');
        }
        return result.response;
    }

    static async createCategory(partPath, data) {
        const result = await HttpUtils.request(config.host + '/categories' + partPath, 'POST', data);
        console.log(result);
        if (result.redirect || result.error || !result.response) {
            return alert('Возникла ошибка при создании категории. Обратитесь в поддержку');
        }
        return result.response;
    }
}