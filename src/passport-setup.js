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
    try {
      // Tenta encontrar um usuário que já tenha se logado com o Google
      let user = await prisma.user.findUnique({
        where: { googleId: profile.id },
      });

      if(!user) {
        user = await prisma.user.create({
            data: {
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
            }
        });
      }

      return done(null, user);


    } catch (error) {
      done(error, null);
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