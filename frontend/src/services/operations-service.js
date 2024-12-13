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
        if (result.redirect || result.error || !result.response) {
            if (result.status !== 400) {
                return alert('Возникла ошибка при создании категории. Обратитесь в поддержку');
            } else if (result.status === 400) {
                return alert('Такая запись уже существует');
            }
        }
        return result.response;
    }

    static async saveOperation(data) {
        const result = await HttpUtils.request(config.host + '/operations', 'POST', data);
        console.log('saveOperation', result);
        if (result.redirect || result.error || !result.response) {
            if (result.status !== 400) {
                return alert('Возникла ошибка при создании категории. Обратитесь в поддержку');
            } else if (result.status !== 400) {
                return alert('Такая запись уже существует');
            }
        }
        return result.response;
    }
}