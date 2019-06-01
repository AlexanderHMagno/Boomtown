const { ApolloError } = require("apollo-server-express");
const authMutations = require("./auth");
const jwt = require("jsonwebtoken");
const { DateScalar } = require("../custom-types");

module.exports = app => {
  return {
    Date: DateScalar,

    Query: {
      viewer(parent, args, context, info) {
        if (context.token) {
          console.log("Token:");
          console.log(jwt.decode(context.token, app.get("JWT_SECRET")));
          return jwt.decode(context.token, app.get("JWT_SECRET"));
        } else {
          return null;
        }
      },
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);
          if (id === null) {
            return null;
          } else {
            return user;
          }
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async items(parent, { filter }, { pgResource }) {
        try {
          const items = await pgResource.getItems(filter);
          return items;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags(parent, { tag }, { pgResource }) {
        try {
          const tags = await pgResource.getTags(tag);
          return tags;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    User: {
      async items({ id }, args, { pgResource }) {
        try {
          const getLentItems = await pgResource.getItemsForUser(id);
          return getLentItems;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async borrowed({ id }, args, { pgResource }) {
        try {
          const getBorrowed = await pgResource.getBorrowedItemsForUser(id);

          return getBorrowed;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    Item: {
      async itemowner({ itemowner }, args, { pgResource }) {
        try {
          const getItemOwner = await pgResource.getUserById(itemowner);
          return getItemOwner;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags({ id }, args, { pgResource }) {
        try {
          const getTag = await pgResource.getTagsForItem(id);
          return getTag;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async borrower({ borrower }, args, { pgResource }) {
        try {
          if (borrower) {
            const getBorrower = await pgResource.getUserById(borrower);
            return getBorrower;
          }
          return null;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    Mutation: {
      ...authMutations(app),

      async addItem(parent, args, context, info) {
        /**
         *  @TODO: Destructuring
         *
         *  The 'args' and 'context' parameters of this resolver can be destructured
         *  to make things more readable and avoid duplication.
         *
         *  When you're finished with this resolver, destructure all necessary
         *  parameters in all of your resolver functions.
         *
         *  Again, you may look at the user resolver for an example of what
         *  destructuring should look like.
         */

        image = await image;
        const user = await jwt.decode(context.token, app.get("JWT_SECRET"));
        const newItem = await context.pgResource.saveNewItem({
          item: args.item,
          image: args.image,
          user
        });
        return newItem;
      }
    }
  };
};
