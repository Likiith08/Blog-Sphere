const User = require("../models/user");

class AuthRepository {

    async findByEmail(email) {

        return await User.findOne({
            where: {
                email: email
            }
        });

    }

    async createUser(userData) {

        return await User.create(userData);

    }

}

module.exports = new AuthRepository();