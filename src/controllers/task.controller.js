import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTask = async(req, res) =>{
    try{
        //pega title e description do body da requisição
        const { title, description } = req.body;

        //pega id do user LOGADO, anexado pelo middleware.
        const userId = req.userId;

        //cria a nova TASK no BD, conectando-a ao usuário.
        const newTask = await prisma.task.create({
            data:{
                title,
                description,
                owner: { //nome do campo de relação no schema.prisma
                    connect: {
                        id: userId //conecta a tarefa ao usuário com esse ID
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

export const getAllTasks = async(req, res) => {
    try {
        const userId = req.userId; //pega ID do usuário logado

        const tasks = await prisma.task.findMany({
            where: { ownerId: userId },
            select: {
                id: true,
                title: true,
                description: true,
                isDone: true,
                createdAt: true,
            },
        });

        //objeto res(responde) para retornar as tarefas do usuário.
        res.status(200).json(tasks);

    } catch(error) {
        //tratativa de erro
        console.error(error);
        res.status(500).json({ message: 'Erro ao procurar tarefas.' });
    };
}