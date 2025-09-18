import jwt from 'jsonwebtoken';
import {Router} from 'express';
import { login } from '../controllers/auth.controller.js';
import passport from 'passport';

const router = Router ();

//login local
router.post('/login', login);

//rota de logout
router.post('/logout', (req, res) =>{
    res.cookie('jwt', '',{
        httpOnly: true,
        expires: new Date(0 ) //expira o cookie imeditamente.
    });
    res.status(200).json({message: 'Logout bem-sucedido!'});
});

//login com Google
router.get('/google',
    passport.authenticate('google',{ scope: ['profile', 'email'] })
);

//rota de callback Google
router.get('/google/callback', (req, res, next) =>{
    passport.authenticate('google', { session: false }, (err, user, info) =>{
        //se passport retornar erro
        if(err){
            console.error('Erro no Passport Authenticate:', err);
            return res.redirect('http://localhost:5173/login?error=auth_failed' );
        }
        //se o passport não encontrar ou criar um usuário (return done(null, false))
        if(!user){
            console.error("Usuário não retornado pela estratégia do Passport:", info);
            return res.redirect('http://localhost:5173/login?error=user_not_found');
        }

        const token = jwt.sign(
            { userId: user.id},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('jwt', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
        });

        res.redirect('http://localhost:5173/dashboard' );
    })(req, res, next);
});

export default router;