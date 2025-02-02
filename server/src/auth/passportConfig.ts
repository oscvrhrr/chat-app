import passport from "passport";
import prisma from "../db/prismaClient.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "default"
}

passport.use(
  new LocalStrategy({ usernameField: "email"}, async(email, password, done) => {
    try {
      const user = await prisma.user.findFirst({
        where: { email }
      })
      if(!user) {
        return done(null, false, { message: "Incorrect email" });
      }
      if(password !== user.password) {
        return done(null, false, { message: "Incorrect password" })
      }
        return done(null, user)
    } catch (err) {
      return done(err)
    }
  })
);


passport.use(
  new JwtStrategy(opts, async(jwt_payload, done) => {
    try {
      const user = await prisma.user.findFirst({
        where: { id: jwt_payload.id }
      });
      if(user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    } catch(err) {
      return done(err, false)
    }
  })
);

export default passport