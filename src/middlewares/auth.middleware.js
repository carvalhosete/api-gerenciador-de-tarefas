import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    //pega o header para autorização
    //const authHeader = req.headers.authorization;

    const token = req.cookies.jwt;

    //verifica se o token existe no cookie.
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
    }
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch(error){
        return res.status(401).json({message: 'Não autorizado: Token inválido'});
    }
    
};