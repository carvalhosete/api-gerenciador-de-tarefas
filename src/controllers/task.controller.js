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

export const updateTasks = async(req, res) =>{
    try {
        const {id: taskID } = req.params;
        const userId = req.userId;
        const { title, description, isDone } = req.body;

        const updateTask = await prisma.task.update({
            where: {
                id: taskID,
                ownerId: userId,
            },
            data: {
                title,
                description,
                isDone,
            },
        });

        res.status(200).json(updateTask);

    } catch(error) {
        console.error(error);
        
        // O Prisma gera um erro com o código 'P2025' quando o registro a ser atualizado não é encontrado.
        if(error.code === 'P2025'){
            return res.status(404).json({message: 'Tarefa não encontrada.'});
        };

        //outros erros retornar código 500.
        res.status(500).json({message:'Erro interno no servidor.'});
    }
};

export const deleteTask = async(req, res) =>{
    try{
        const { id: taskID } = req.params;
        const userId = req.userId;
        const dltTask = await prisma.task.delete({
            where: {
                id: taskID,
                ownerId: userId
            }     //deleta a task quando o id for localizado
        });

        //envio da resposta '204 No Content'
        res.status(204).send();

    } catch(error) {
        console.error(error);

        //dele funciona da mesma forma que o update se não encontra o usuário, o código retornado é P2025, portanto a tratativa de erro é igual.
        if (error.code === 'P2025'){
            return res.status(404).json({message: 'Tarefa não encontrada.'});
        };

        //outros erros retornar código 500.
        res.status(500).json({message:'Erro interno no servidor.'});
    }
};