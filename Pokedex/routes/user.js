import express from 'express';
const userRouter = express.Router();
import { GetHome, PostHome } from '../controllers/usersController.js';

userRouter.get("/", GetHome);
userRouter.post("/", PostHome);

export default userRouter;