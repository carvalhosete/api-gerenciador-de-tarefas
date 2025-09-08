import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    //pega o header para autorização
    //const authHeader = req.headers.authorization;

    const token = req.cookies.jwt;

    //verifica se o token existe no cookie.
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
    }
    
    //verifica o token e anexa o userID à requisição
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