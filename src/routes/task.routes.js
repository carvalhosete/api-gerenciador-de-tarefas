import { Router } from "express";
import { createTask } from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

//todas as rotas de tarefas são protegidas sem precisar repetir o 'authMiddleware'
router.use(authMiddleware);

router.post('/tasks', createTask);

export default router;