import express from 'express';
import userRoutes from './routes/user.routes.js'; //importa as rotas

const app = express();
const PORT = 3000;

app.use(express.json()); //Faz o Express entender o JSON no corpo das requisições

app.listen(PORT, function(){
    console.log(`Express está rodando na porta ${PORT}`);
});  //Teste para saber a porta que EXPRESS está rodando.

app.get('/', (req, res) =>{
    res.send('API Gerenciador de Tarefas está ON!');
});

//Usa as rotas de usuário
app.use('/api', userRoutes);    