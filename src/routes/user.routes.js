import { Router } from "express";
import { createUser, getAllUsers, getOneUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

//rota public: qualquer um pode criar um novo usuário
router.post('/users', createUser);

//rotas protegidas pelo authMiddleware. Sómente usuários com token válido podem acessar.
router.get('/users', authMiddleware, getAllUsers);
router.get('/users/:id', authMiddleware, getOneUser);
router.put('/users/:id', authMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, deleteUser);

export default router;


//id: 2926fea8-d5ab-462d-8f92-784ec1f6dd1f   | a9ad2288-9e68-4c8b-b74f-ac3014d0e0cb