class UserInfo {
  constructor({ userNameInput, userJobInput }) {
    this._userNameElement = document.querySelector(userNameInput);
    this._userJobElement = document.querySelector(userJobInput);
  }

  addUserInfo({ userNewNameInput, userNewJobInput }) {
    this._userNameElement.textContent = userNewNameInput;
    this._userJobElement.textContent = userNewJobInput;
  }

  getUserInfo() {
    const newObject = {
      userNameInput: this._userNameElement.textContent,
      userJobInput: this._userJobElement.textContent,
    };
    return newObject;
  }
}

export default UserInfo;
