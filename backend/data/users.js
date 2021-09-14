const bcrypt = require("bcryptjs");

const users = [
  {
    name: "admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("zaiem786", 10),
    isAdmin: true,
  },
  {
    name: "user1",
    email: "user1@admin.com",
    password: bcrypt.hashSync("user1786", 10),
  },
  {
    name: "user2",
    email: "user2@admin.com",
    password: bcrypt.hashSync("user2786", 10),
  },
];

module.exports = users;
