class Api {
    constructor(req) {
        this._headers = req.headers;
        this._url = req.url;
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            credentials: 'include', // теперь куки посылаются вместе с запросом
        })
            .then(this._check);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            credentials: 'include', // теперь куки посылаются вместе с запросом
        })
            .then(this._check);
    }

    editUserData(data) {
        console.log(12)

        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers :this._headers,
            credentials: 'include', // теперь куки посылаются вместе с запросом
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._check);
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            credentials: 'include', // теперь куки посылаются вместе с запросом
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        })
            .then(this._check);
    }

    cardDelete(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
            credentials: 'include', // теперь куки посылаются вместе с запросом
        })
            .then(this._check);
    }

    setLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
            credentials: 'include', // теперь куки посылаются вместе с запросом
        })
            .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        });
    }

    removeLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`,
            {
            method: "DELETE",
            headers: this._headers,
            credentials: 'include', // теперь куки посылаются вместе с запросом
        })
            .then(this._check);
    }

    updateAvatar(data) {
        console.log(data.link);
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            credentials: 'include', // теперь куки посылаются вместе с запросом
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then(this._check);
    }

    _check(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return this.setLike(id)
        } else {
            return this.removeLike(id)
        }
    }
}

const api = new Api({
    url: 'http://api.mesto.abunasyr7.nomoredomains.club',
    headers: {
        // authorization: '1174dadd-027e-4ffe-b733-ac48b2285022',
        'Accept': 'applications/json',
        'Content-Type': 'application/json',
    }
});

export default api;