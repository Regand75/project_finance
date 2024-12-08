import {HttpUtils} from "../../utils/http-utils.js";
import config from "../../../config/config.js";
import {AuthUtils} from "../../utils/auth-utils.js";

export class Logout {
    constructor() {
        if (!localStorage.getItem('accessToken') || !localStorage.getItem('refreshToken')) {
            return location.href = '#/login';
        }
        this.logout().then();
    }

    async logout() {
        const refreshToken = localStorage.getItem(AuthUtils.refreshTokenKey);
        if (refreshToken) {
            const result = await HttpUtils.request(config.host + '/logout', 'POST', {
                refreshToken: refreshToken,
            });
            console.log(result);
            AuthUtils.removeToken();
            AuthUtils.removeUserInfo();
            window.location.href = '#/login';
        } else {
            AuthUtils.removeUserInfo();
            window.location.href = '#/login';
        }
    }
}