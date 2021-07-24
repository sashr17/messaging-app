const chatUsers = [];

function joinUser(id, userName, roomName) {
  const user = { id, userName, roomName };

  chatUsers.push(user);
  return user;
}

function getCurrentUser(id) {
  return chatUsers.find((user) => user.id === id);
}

function removeUser(id) {
  const index = chatUsers.findIndex((user) => user.id === id);

  if (index !== -1) {
    return chatUsers.splice(index, 1)[0];
  }
}

module.exports = {
  joinUser,
  getCurrentUser,
  removeUser,
};
