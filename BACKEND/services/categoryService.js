
const categoryRepository = require("../repositories/categoryRepository");



class CategoryService {

    async createCategory(categoryData) {

        const existingCategory = await categoryRepository.findByName(categoryData.name);

        if (existingCategory) {
            return {
                success: false,
                message: "Category Already Exists"
            };
        }

        const category = await categoryRepository.createCategory(categoryData);

        return {
            success: true,
            message: "Category Created Successfully",
            data: category
        };

    }

    async getAllCategories() {

        const categories = await categoryRepository.getAllCategories();

        return {
            success: true,
            data: categories
        };

    }

    async getBlogsByCategory(categoryId) {

    const blogs = await categoryRepository.getBlogsByCategory(categoryId);

    return {
        success: true,
        totalBlogs: blogs.length,
        data: blogs
    };

}


}

module.exports = new CategoryService();