import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    //pega o header para autorização
    const authHeader = req.headers.authorization;

    //verifica se o header existe
    if (!authHeader) {
        return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
    }

    //token vindo no formato "Bearer TOKEN". Será separados em duas partes.
    const parts = authHeader.split(' ');

    if(parts.length !== 2){
        return res.status(401).json({ message: 'Erro no formato do token.' });
    }

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).json({ message: 'Token mal formatado.' })
    }

    //verifica o token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
        if(err){
            return res.status(401).json({ message: 'Token inválido ou expirado.' });
        }

        //se o token for válido, anexa o payload (com userID) na requisição
        req.userId = decoded.userId;

        //chama o proximo middleware ou controller.
        return next();
    });
};