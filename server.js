import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRouter from './routes/userRouter.js';
import blogRouter from './routes/blogRouter.js';

const app = express();
const port=process.env.serverPort; //4000



mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Database connected');
})
.catch((error) => {
    console.log(error);
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(cors());
app.use(express.json());

app.use("/api/user",userRouter);
app.use("/api/blog",blogRouter);

