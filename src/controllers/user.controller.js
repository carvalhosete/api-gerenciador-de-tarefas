import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        //Criptografar a senha antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });

        // Não retornar a senha na resposta!
        const { password: _, ...userWithouPassoword } = newUser;
        res.status(201).json(userWithouPassoword);
    
    } catch (error) {
        //Tratamento de erro
        res.status(500).json({message: 'Erro ao criar usuário', error: error.message });
    }
};

export const getAllUsers = async(req, res) =>{
    try{
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true
                //Retornando todos os campos do BD menos o password por questões de segurança.
            }
        });

        //objeto res(response) para retornar o que foi solicitado.
        res.status(200).json(users);
    } catch(error) {
        //Tratamento de erro
        console.log(error);
        res.status(500).json({message: 'Erro ao buscar usuários', error: error.message});
    }
};

export const getOneUser = async(req, res) =>{
    try{
        const searchId = await prisma.user.findUnique({
            where: {id: req.params.id},
            select:{
                id: true,
                name: true
                //Retornando o ID passado como parametro e o nome(so pra teste)
            }
        });

        if(searchId!=null){
            //res de retorno.
            res.status(200).json(searchId);    
        } else {
            res.status(404).json({message: 'Usuário não encontrado.'});
        };
    } catch(error){
        //Tratamento de erro
        console.log(error);
        res.status(500).json({message: 'Erro ao buscar ID', error: error.message});    
    }   
};