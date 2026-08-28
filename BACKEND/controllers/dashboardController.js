const dashboardService = require("../services/dashboardService");

class DashboardController {

    async getDashboardStats(req, res) {

        const result = await dashboardService.getDashboardStats();

        res.json(result);

    }

}

module.exports = new DashboardController();