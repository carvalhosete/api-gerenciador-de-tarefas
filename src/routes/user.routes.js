import { Router } from "express";
import { createUser, getAllUsers, getOneUser } from "../controllers/user.controller.js";

const router = Router();

router.post('/users', createUser);

router.get('/users', getAllUsers);

router.get('/users/:id', getOneUser);

export default router;


//id: 2926fea8-d5ab-462d-8f92-784ec1f6dd1f