const users = [];

// Join user to table
function userJoin(id, ftUser, tablePath) {
  const user = { id, ftUser, tablePath };

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves table
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get table users
function getTableUsers(tablePath) {
  return users.filter(user => user.tablePath === tablePath);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getTableUsers,
};
