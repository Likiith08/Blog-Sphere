const blogRepository = require("../repositories/blogRepository");
const Category = require("../models/category");

class BlogService {

    // Create Blog
    async createBlog(userId, blogData) {

        // Check if category exists
        const category = await Category.findByPk(blogData.categoryId);

        if (!category) {
            return {
                success: false,
                message: "Category Not Found"
            };
        }

        const newBlog = {
            title: blogData.title,
            content: blogData.content,
            image: blogData.image,
            categoryId: blogData.categoryId,
            userId
        };

        const blog = await blogRepository.createBlog(newBlog);

        return {
            success: true,
            message: "Blog Created Successfully",
            data: blog
        };

    }

    // Get All Blogs
    async getAllBlogs(page, limit) {

    const result = await blogRepository.getAllBlogs(page, limit);

    return {
        success: true,
        page,
        limit,
        totalBlogs: result.totalBlogs,
        totalPages: Math.ceil(result.totalBlogs / limit),
        data: result.blogs
    };

}

    // Get Blog By ID
    async getBlogById(id) {

        const blog = await blogRepository.getBlogById(id);

        if (!blog) {
            return {
                success: false,
                message: "Blog Not Found"
            };
        }

        return {
            success: true,
            data: blog
        };

    }

    // Update Blog
    async updateBlog(id, userId, blogData) {

        const blog = await blogRepository.getBlogById(id);

        if (!blog) {
            return {
                success: false,
                message: "Blog Not Found"
            };
        }

        if (blog.userId !== userId) {
            return {
                success: false,
                message: "Unauthorized"
            };
        }

        // Check if category exists
        const category = await Category.findByPk(blogData.categoryId);

        if (!category) {
            return {
                success: false,
                message: "Category Not Found"
            };
        }

        const updatedBlog = await blogRepository.updateBlog(id, {
            title: blogData.title,
            content: blogData.content,
            image: blogData.image,
            categoryId: blogData.categoryId
        });

        return {
            success: true,
            message: "Blog Updated Successfully",
            data: updatedBlog
        };

    }

    // Delete Blog
    async deleteBlog(id, userId) {

        const blog = await blogRepository.getBlogById(id);

        if (!blog) {
            return {
                success: false,
                message: "Blog Not Found"
            };
        }

        if (blog.userId !== userId) {
            return {
                success: false,
                message: "Unauthorized"
            };
        }

        await blogRepository.deleteBlog(id);

        return {
            success: true,
            message: "Blog Deleted Successfully"
        };

    }

    async searchBlogs(keyword) {

    if (!keyword) {

        return {
            success: false,
            message: "Keyword is required"
        };

    }

    const blogs = await blogRepository.searchBlogs(keyword);

    return {

        success: true,
        totalBlogs: blogs.length,
        data: blogs

    };

}

}

module.exports = new BlogService();