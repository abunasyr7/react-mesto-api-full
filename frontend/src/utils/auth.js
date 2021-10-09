export const BASE_URL = "http://api.mesto.abunasyr7.nomoredomains.club";

const checkRes = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password})
    }).then((res) => checkRes(res))
};

export const authorization = (email, password, token) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email,password}),
        credentials: 'include', // теперь куки посылаются вместе с запросом
    }).then((res)=> checkRes(res))
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include', // теперь куки посылаются вместе с запросом
    }).then((res) => checkRes(res))
}
