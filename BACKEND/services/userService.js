const userRepository = require("../repositories/userRepository");


class UserService {

    async getProfile(userId) {

        const user = await userRepository.getUserById(userId);

        if (!user) {
            return {
                success: false,
                message: "User Not Found"
            };
        }

        return {
            success: true,
            data: user
        };

    }

    async updateProfile(userId, userData) {

        const updatedUser = await userRepository.updateUser(userId, {
            username: userData.username,
            bio: userData.bio,
            profileImage: userData.profileImage
        });

        return {
            success: true,
            message: "Profile Updated Successfully",
            data: updatedUser
        };

    }

}

module.exports = new UserService();