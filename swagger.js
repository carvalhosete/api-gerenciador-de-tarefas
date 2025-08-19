import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Minha API de Gestão de Tarefas',
        description: 'Documentação da API de gerenciamento, criada como parte da consolidação das ferramentas back-end e portifólio.',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    securityDefinitions: {//Adiciona a definição de segurança para Bearer Token
        bearerAuth:{
            type: 'apiKey',
            name: 'Authorization',
            in:   'header',
            description: 'Para acessar as rotas protegidas, insira o token JWT no formato: Bearer {token}'
        }
    }
};

const outputFile = './swagger-output.json'; //onde o arquivo de saída será gerado
const endpointsFiles = ['./src/server.js']; //o arquivo de entrada para encontrar as rotas.

//gera o arquivo swagger-output.json
swaggerAutogen( )(outputFile, endpointsFiles, doc);