import express from "express";

import {addBlog,getBlogs,getBlogById,updateBlog,deleteBlog} from "../controller/blogController.js";
const blogRouter=express.Router();

blogRouter.post("/create",addBlog);
blogRouter.get("/get",getBlogs);
blogRouter.get("/get/:id",getBlogById);
// blogRouter.get("/getmyblogs/:id",getBlogByuserId);
blogRouter.put("/update/:id",updateBlog);
blogRouter.delete("/delete/:id",deleteBlog);

export default blogRouter;
