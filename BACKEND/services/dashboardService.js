const dashboardRepository = require("../repositories/dashboardRepository");

class DashboardService {

    async getDashboardStats() {

        const stats = await dashboardRepository.getDashboardStats();

        return {
            success: true,
            data: stats
        };

    }

}

module.exports = new DashboardService();