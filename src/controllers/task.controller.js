import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTask = async(req, res) =>{
    try{
        //pega title e description do body da requisição
        const { title, description } = req.body;

        //pega id do user LOGADO, anexado pelo middleware.
        const userID = req.userID;

        //cria a nova TASK no BD, conectando-a ao usuário.
        const newTask = await prisma.task.create({
            data:{
                title,
                description,
                owner: { //nome do campo de relação no schema.prisma
                    connect: {
                        id: userID //conecta a tarefa ao usuário com esse ID
                    }
                }
            }
        });
        
        //retorna tarefa recém criada.
        res.status(201).json(newTask);
    } catch (error){
        console.error(error);
        res.status(500).json({message: 'Erro ao criar nova tarefa.'});
    };
}