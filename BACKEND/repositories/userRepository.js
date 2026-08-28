const User = require("../models/user");

class UserRepository {

    // Get user by ID
    async getUserById(id) {

        return await User.findByPk(id, {
            attributes: {
                exclude: ["password"]
            }
        });

    }

    // Update user profile
    async updateUser(id, userData) {

        await User.update(userData, {
            where: { id }
        });

        return await User.findByPk(id, {
            attributes: {
                exclude: ["password"]
            }
        });

    }

}

module.exports = new UserRepository();