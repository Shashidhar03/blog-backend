import mongoose, { mongo } from 'mongoose';
import blogModel from '../model/blogModel.js';

const addBlog = async (req, res) => {
    const { title, content, imageUrl,userID } = req.body;
    try {
        const blog = new blogModel({
            title,
            content,
            imageUrl,
            userID
        });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getBlogById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const blog = await blogModel.find({userID:id});
        res.status(200).json(blog);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content, imageUrl } = req.body;
    try {
        const blog = await blogModel.findById(id);
        blog.title = title;
        blog.content = content;
        blog.imageUrl = imageUrl;
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        await blogModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Blog deleted successfully' });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export { addBlog, getBlogs, getBlogById, updateBlog, deleteBlog };
