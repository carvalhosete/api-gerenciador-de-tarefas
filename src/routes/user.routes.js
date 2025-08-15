import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";

const router = Router();

router.post('/users', createUser);

export default router;