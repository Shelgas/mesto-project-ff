const token = "7c760cdd-df7e-46ae-b029-25fc6a6766a8";
const groupID = "wff-cohort-8";
const address = `https://nomoreparties.co/v1/${groupID}`;

const config = {
  baseUrl: `${address}`,
  headers: {
    authorization: `${token}`,
    "Content-Type": "application/json",
  },
};

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${(response.status, response.statusText)}`);
};

export const getAutorInformation = () => {
  return fetch(`${address}/users/me`, {
    headers: {
      authorization: token,
    },
  }).then(handleResponse);
};

export const getCards = () => {
  return fetch(`${address}/cards`, {
    headers: {
      authorization: token,
    },
  }).then(handleResponse);
};

export const updateProfile = (name, about) => {
  return fetch(`${address}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleResponse);
};

export const addNewCard = (newCard) => {
  return fetch(`${address}/cards`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link,
    }),
  }).then(handleResponse);
};

export const deleteCard = (cardId) => {
  return fetch(`${address}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
};

export const likeCard = (cardId) => {
  return fetch(`${address}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
};

export const dislikeCard = (cardId) => {
  return fetch(`${address}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
};

export const editAvatar = async (link) => {
  const isTypeValid = await checkLink(link, 'image'); 
  if (isTypeValid) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(handleResponse);
  } else {
    return Promise.reject(`Не является изображением`);
  }
};


function checkLink(link, type) {
  return fetch(`${link}`, { method: "HEAD" }).then((response) => {
    if (response.headers.get("content-type").includes(type)) {
      return true;
    }
    return false;
  });
}