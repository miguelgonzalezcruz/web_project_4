// Server information Project 9.
// Token: f0f5b035-9e61-4cc2-926f-83804fb546a7
// Group ID: group-12

// EDITA EL NOMBRE DE USUARIO

const user = new UserInfo({
  userName: ".profile__info-name",
  userJob: ".profile__info-title",
  userAvatar: ".profile__avatar",
});

let UserId = null;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfoResponse, cardsResponse]) => {
    //user info set up
    user.setAvatar(userInfoResponse.avatar);
    UserId = userInfoResponse._id;
    user.setUserInfoTextOnly(userInfoResponse);
    //cards set up
    cardGridObject.setItems(cardsResponse);

    cardGridObject.renderItems();
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });
