const categoryService = require("../services/categoryService");

class CategoryController {

    async createCategory(req, res) {

        const result = await categoryService.createCategory(req.body);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(201).json(result);

    }

    async getAllCategories(req, res) {

        const result = await categoryService.getAllCategories();

        res.json(result);

    }

    async getBlogsByCategory(req, res) {

    const result = await categoryService.getBlogsByCategory(
        req.params.categoryId
    );

    res.json(result);

}

}

module.exports = new CategoryController();