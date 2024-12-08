import {AuthUtils} from "./auth-utils.js";

export class HttpUtils {
    static async request(url, method = 'GET', body = null, retries = 1) {
        const params = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        };
        let token = localStorage.getItem(AuthUtils.accessTokenKey);
        if (token) {
            params.headers['x-auth-token'] = token;
        }
        if (body) {
            params.body = JSON.stringify(body);
        }
        const response = await fetch(url, params);
        if (response.status < 200 || response.status >= 300) {
            if (response.status === 401 && retries > 0) {
                const result = await AuthUtils.processUnauthorizedResponse();
                if (result) {
                    return await this.request(url, method, body, retries - 1);
                } else {
                    return await response.json();
                }
            }
            return await response.json();
        }
        return await response.json();
    }
}