const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function setCookie({ tokenName, token, res }) {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 2 * 60 * 6000
  });
  // -------------------------------
}

function generateToken(user, secret) {
  const { id, email, fullname, bio } = user;
  return jwt.sign({ id, email, fullname, bio }, secret, { expiresIn: "2h" });
  // -------------------------------
}
//the name of this resolver has to be the same name as the name in the schema!!!!!! signup...
module.exports = app => {
  return {
    async signup(parent, args, context) {
      try {
        const SALT = 10;
        const hashedPassword = await bcrypt.hash(args.user.password, SALT);
        // -------------------------------

        const user = await context.pgResource.createUser({
          fullname: args.user.fullname,
          email: args.user.email,
          password: hashedPassword
        });

        setCookie({
          tokenName: app.get("JWT_COOKIE_NAME"),
          token: generateToken(user, app.get("JWT_SECRET")),
          res: context.req.res
        });

        return {
          id: user.id
        };
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    async login(parent, args, context) {
      try {
        const user = await context.pgResource.getUserAndPasswordForVerification(
          args.user.email
        );

        const valid = await bcrypt.compare(args.user.password, user.password);

        if (!valid || !user) throw "User was not found.";

        setCookie({
          tokenName: app.get("JWT_COOKIE_NAME"),
          token: generateToken(user, app.get("JWT_SECRET")),
          res: context.req.res
        });

        return {
          id: user.id
        };
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    logout(parent, args, context) {
      context.req.res.clearCookie(app.get("JWT_COOKIE_NAME"));
      return true;
    }
  };
};
