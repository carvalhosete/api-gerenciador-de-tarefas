import { Router } from "express";
import { createUser, getAllUsers, getOneUser } from "../controllers/user.controller.js";

const router = Router();

router.post('/users', createUser);

router.get('/users', getAllUsers);

router.get('/users/:id', getOneUser);

export default router;