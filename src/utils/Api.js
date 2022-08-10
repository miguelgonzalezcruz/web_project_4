// Server information Project 9.
// Token: f0f5b035-9e61-4cc2-926f-83804fb546a7
// Group ID: group-12

class Api {
  constructor(info) {
    this._url = info.url;
    this._headers = info.headers;
  }

  getUserInfo() {
    return fetch(this._url + "/users/me", {
      headers: this._headers,
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(this._url + "/cards", {
      headers: this._headers,
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // --- Work in Progress

  editUserInfo(data) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default Api;
