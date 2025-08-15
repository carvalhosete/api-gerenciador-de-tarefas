import { Router } from "express";
import { createUser, getAllUsers, getOneUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = Router();

router.post('/users', createUser);

router.get('/users', getAllUsers);

router.get('/users/:id', getOneUser);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

export default router;


//id: 2926fea8-d5ab-462d-8f92-784ec1f6dd1f   | a9ad2288-9e68-4c8b-b74f-ac3014d0e0cb