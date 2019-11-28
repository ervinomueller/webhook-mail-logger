// users hardcoded for simplicity, store in a db for production applications
const User = require('../models/user')

module.exports = {
    authenticate
};

async function authenticate({ username, password }) {
    const user = User.find({username: username, password: password});
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
