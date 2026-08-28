const Category = require("../models/category");
const Blog = require("../models/blog");

class CategoryRepository {

    async createCategory(categoryData) {

        return await Category.create(categoryData);

    }

    async getAllCategories() {

        return await Category.findAll();

    }

    async findByName(name) {

        return await Category.findOne({
            where: { name }
        });

    }

    async getBlogsByCategory(categoryId) {

    return await Blog.findAll({
        where: {
            categoryId
        }
    });

}

}

module.exports = new CategoryRepository();