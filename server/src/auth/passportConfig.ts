import passport from "passport"
import bcrypt from "bcryptjs"
import LocalStrategy from "passport-local"
import { Strategy } from "passport-jwt"
import { ExtractJwt } from "passport-jwt"

opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(
  new LocalStrategy(async(username, password, done) => {
    try {

    } catch (err) {
      return done(err)
    }
  });
);


passport.use(
  new Strategy(opts, async(jwt_payload, done) => {
    try {

    } catch(err) {
      return done(err, false)
    }
  });
);