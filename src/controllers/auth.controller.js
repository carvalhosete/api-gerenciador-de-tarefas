import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const login = async (req, res) => {
    try{
        //pega e-mail e senha do body da requisição.
        const {email, password} = req.body;

        //busca user no bd pelo email
        const user = await prisma.user.findUnique({
            where: {email},
        });

        //tratativa de erro se o usuário não existir
        if (!user) {
            return res.status(401).json({messsage: 'Credenciais inválidas'}); //code 401 Unauthorized
        }

        //compara senha inserida com a do bd
        const isPasswordValid = await bcrypt.compare(password, user.password);

        //tratativa de erro para caso a senha for inválida
        if (!isPasswordValid){
            return res.status(401).json({message: 'Credenciais inválidas'});
        }

        //gera token JWT caso a senha esteja correta.
        const token = jwt.sign(
            {userID: user.id},      //PayLoad que será guardado no token
            process.env.JWT_SECRET, //segredo guardado no arquivo .env
            {expiresIn: '1h'}       //define a validade do token (1 hora)
        );

        //retorna token pro cliente.
        res.status(200).json({token});

    } catch(error) {
        console.error(error);
        res.status(500).json({message: 'Erro interno no servidor.' });
    }
}