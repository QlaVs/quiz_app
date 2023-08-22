import { __awaiter, __generator } from "tslib";
import axios from "axios";
import * as api from '@/background/data/constants/api';
import authHeader from "../data/constants/auth-header";
import router from "@/render/router";
export function makeRequest(query) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios({
                    timeout: 10000,
                    method: query.method,
                    url: api.url + "/" + query.url,
                    data: query.body,
                    headers: Object.assign({}, api.jsonHeader, authHeader())
                }).catch(function (err) {
                    if (err.code === "ECONNABORTED") {
                        err.status = 2;
                    }
                    else if (err.code === "ERR_NETWORK") {
                        err.status = 3;
                    }
                    else if (err.response && err.response.status == 401) {
                        router.push('/auth');
                    }
                    return Promise.reject(err);
                }).then(function (response) { return response.data; }).then(function (data) {
                    return data;
                })];
        });
    });
}
export function login(username, password) {
    return {
        method: "POST",
        url: "login",
        body: {
            "username": username,
            "password": password
        }
    };
}
export function register(username, password, password2) {
    return {
        method: "POST",
        url: "register",
        body: {
            "username": username,
            "password": password,
            "password2": password2
        }
    };
}
export function logout() {
    return {
        method: "POST",
        url: "logout"
    };
}
export function getQuizList() {
    return {
        method: "GET",
        url: 'getQuizList'
    };
}
export function getQuiz(id) {
    if (id == null) {
        id = -1;
    }
    return {
        method: "GET",
        url: "getQuiz?id=".concat(id)
    };
}
export function checkResults(quizId, answersData) {
    return {
        method: "POST",
        url: "checkResults",
        body: {
            "quizId": quizId,
            "answersData": answersData,
        }
    };
}
//# sourceMappingURL=repository.js.map