import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path'
import { fileURLToPath } from 'url';
import userRoutes from './routes/user.routes.js'; //importa as rotas
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js'; //importa as rotas de task
import swaggerUi from 'swagger-ui-express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerFile = JSON.parse(fs.readFileSync(path.join(__dirname,'../swagger-output.json'),'utf-8'));


const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json()); //Faz o Express entender o JSON no corpo das requisições

app.get('/', (req, res) =>{
    res.send('API Gerenciador de Tarefas está ON!');
});

app.use('/api', userRoutes); //Use as rotas de usuário
app.use('/api', authRoutes); //Use as rotas de autenticação
app.use('/api', taskRoutes); //Use rotas de tarefas

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile)); //Rota de documentação com SWAGGER

app.listen(PORT, function(){
    console.log(`Express está rodando na porta ${PORT}`);
});  //Teste para saber a porta que EXPRESS está rodando.

