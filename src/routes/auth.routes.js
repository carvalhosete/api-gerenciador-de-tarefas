import jwt from 'jsonwebtoken';
import {Router} from 'express';
import { login } from '../controllers/auth.controller.js';
import passport from 'passport';

const router = Router ();

//login local
router.post('/login', login);

//login com Google
router.get('/google',
    passport.authenticate('google',{ scope: ['profile', 'email'] })
);

//rota de callback Google
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:5173/login', //em caso de falha redireciona
        session: false
    }),
    (req, res) => {
        const token = jwt.sign(
            { userID: req.user.id},
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        );

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
        });

        res.redirect('http://localhost:5173/dashboard');
    }
)

export default router;