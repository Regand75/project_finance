import {HttpUtils} from "../utils/http-utils.js";
import config from "../../config/config.js";

export class AuthService {

    static async login(data) {
        const result = await HttpUtils.request(config.host + '/login', 'POST', data);
        if (result.error || !result.tokens.accessToken || !result.tokens.refreshToken || !result.user.name || !result.user.lastName || !result.user.id) {
            return false;
        }
        return result;
    }

    static async signup(data) {
        const result = await HttpUtils.request(config.host + '/signup', 'POST', data);
        if (result.error || !result.user) {
            return false;
        }
        return result;
    }
}