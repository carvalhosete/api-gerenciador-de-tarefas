import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("Inicio do CALLBACK");
    console.log("Perfil recebido pelo Google:", profile);
    try {
      // Tenta encontrar um usuário que já tenha se logado com o Google
      console.log(`[1]Procurando usuário com o googleID: ${profile.id})`);
      let user = await prisma.user.findUnique({
        where: { googleId: profile.id },
      });

      if(user) {
        console.log("[2] Usuário encontrado no banco de dados:", JSON.stringify(user, null, 2));
        console.log("Fim do CALLBACK. SUCESSO!!");
        return done(null, user);

      } else { 
        console.log(`[2] Usuário não encontrado no banco de dados. Tentando criar um novo....`);

        const newUser = await prisma.user.create({
          data:{
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          }
        });

        console.log(`[3] Novo usuário criado: ${newUser}`);
        console.log(`Fim do CallBack: Sucesso(Novosuário)`);
        return done(null, newUser);
      }


    } catch (error) {
      console.error("Erro dentro do CallBack do Google!");
      console.error("Fim do CallBack(Falha) - Erro no catch");
      return done(error, null);
    }
  })
);


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
});