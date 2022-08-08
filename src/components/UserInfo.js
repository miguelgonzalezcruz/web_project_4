class UserInfo {
  constructor({ userNameInput, userJobInput, userAvatarInput }) {
    this._userNameElement = document.querySelector(userNameInput);
    this._userJobElement = document.querySelector(userJobInput);
    this._userAvatarInput = document.querySelector(userAvatarInput);
  }

  addUserInfo({ userNewNameInput, userNewJobInput, userNewAvatarInput }) {
    this._userNameElement.textContent = userNewNameInput;
    this._userJobElement.textContent = userNewJobInput;
    // this.userAvatarInput.src = userNewAvatarInput;
  }

  getUserInfo() {
    const newObject = {
      userNameInput: this._userNameElement.textContent,
      userJobInput: this._userJobElement.textContent,
      userAvatarInput: this._userAvatarInput.src,
    };
    return newObject;
  }
}

export default UserInfo;
