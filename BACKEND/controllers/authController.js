const authService = require("../services/authService");

class AuthController {

    async register(req, res) {

        const result = await authService.register(req.body);

        res.json(result);

    }

    async login(req,res) {

        const result = await authService.login(req.body);
        res.json(result);
    }

}

module.exports = new AuthController();