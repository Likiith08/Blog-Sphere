const userService = require("../services/userService");

class UserController {

    async getProfile(req, res) {

        const result = await userService.getProfile(req.user.id);

        if (!result.success) {
            return res.status(404).json(result);
        }

        res.json(result);

    }

    async updateProfile(req, res) {

        const result = await userService.updateProfile(
            req.user.id,
            req.body
        );

        res.json(result);

    }

}

module.exports = new UserController();