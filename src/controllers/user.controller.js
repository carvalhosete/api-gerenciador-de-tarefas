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
        console.error(error);
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
        console.error(error);
        res.status(500).json({message: 'Erro ao buscar ID', error: error.message});    
    }   
};

export const updateUser = async(req, res) =>{
    try{
        const {id} = req.params;
        const {name} = req.body;
        const newNameUser = await prisma.user.update({
            where: { id },
            data: { name }, //Atualiza o campo "name" com o valor atribuído na variável "name" declarada no inicio da função.
            select: { //Select/retorno para verificar se a alteração foi realizada.
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true, //Campo atualiado automaticamente pela 'function prisma.user.update();'

            }
        });

        res.status(200).json(newNameUser);

    } catch(error) {
        console.error(error);
        
        // O Prisma gera um erro com o código 'P2025' quando o registro a ser atualizado não é encontrado.
        if(error.code === 'P2025'){
            return res.status(404).json({message: 'Usuário não encontrado.'});
        };

        //outros erros retornar código 500.
        res.status(500).json({message:'Erro interno no servidor.'});
    }
};

export const deleteUser = async(req, res) =>{
    try{
        const {id} = req.params;
        const dltUser = await prisma.user.delete({
            where: {id}     //deleta o usuário quando o id for localizado
        });

        //envio da resposta '204 No Content'
        res.status(204).send();

    } catch(error) {
        console.error(error);

        //dele funciona da mesma forma que o update se não encontra o usuário, o código retornado é P2025, portanto a tratativa de erro é igual.
        if (error.code === 'P2025'){
            return res.status(404).json({message: 'Usuário não encontrado.'});
        };

        //outros erros retornar código 500.
        res.status(500).json({message:'Erro interno no servidor.'});
    }
};