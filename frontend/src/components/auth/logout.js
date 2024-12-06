import {CustomHttp} from "../../services/custom-http.js";
import config from "../../../config/config.js";
import {Auth} from "../../services/auth.js";

export class Logout {
    constructor() {
        if (!localStorage.getItem('accessToken') || !localStorage.getItem('refreshToken')) {
            return location.href = '#/login';
        }
        this.logout().then();
    }

    async logout() {
        const refreshToken = localStorage.getItem(Auth.refreshTokenKey);
        if (refreshToken) {
            const result = await CustomHttp.request(config.host + '/logout', 'POST', {
                refreshToken: refreshToken,
            });
            console.log(result);
            Auth.removeToken();
            Auth.removeUserInfo();
            window.location.href = '#/login';
        } else {
            Auth.removeUserInfo();
            window.location.href = '#/login';
        }
    }
}