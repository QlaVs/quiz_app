import axios from "axios";
import * as api from '@/background/data/constants/api'
import authHeader from "../data/constants/auth-header";
import router from "@/render/router";

export async function makeRequest(
    query: {
        method: string,
        url: string,
        body: any,
    }
) {

    return axios({
        timeout: 10000,
        method: query.method,
        url: api.url + "/" + query.url,
        data: query.body,
        headers: Object.assign({}, api.jsonHeader, authHeader())

    }).catch((err) => {
        if (err.code === "ECONNABORTED") {
            err.status = 2;
        } else if (err.code === "ERR_NETWORK") {
            err.status = 3;
        } else if (err.response && err.response.status == 401) {
            router.push('/auth')
        }
        return Promise.reject(err);
    }).then(response => response.data).then(data => {
        return data
    });
}


export function login(
    username: string,
    password: string
): any {
    return {
        method: "POST",
        url: `login`,
        body: {
            "username": username,
            "password": password
        }
    };
}


export function register(
    username: string,
    password: string,
    password2: string
): any {
    return {
        method: "POST",
        url: `register`,
        body: {
            "username": username,
            "password": password,
            "password2": password2
        }
    };
}


export function logout(): any {
    return {
        method: "POST",
        url: `logout`
    };
}


export function getQuizList(): any {
    return {
        method: "GET",
        url: 'getQuizList'
    }
}


export function getQuiz(
    id: any
): any {
    if (id == null) {
        id = -1
    }

    return {
        method: "GET",
        url: `getQuiz?id=${id}`
    }
}

export function checkResults(
    quizId: number,
    answersData: any
): any {
    return {
        method: "POST",
        url: `checkResults`,
        body: {
            "quizId": quizId,
            "answersData": answersData,
        }
    }
}

