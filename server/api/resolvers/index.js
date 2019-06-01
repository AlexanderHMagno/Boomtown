/**
 *  @TODO: Handling Server Errors
 *
 *  Once you've completed your pg-resource.js methods and handled errors
 *  use the ApolloError constructor to capture and return errors from your resolvers.
 *
 *  Throwing ApolloErrors from your resolvers is a nice pattern to follow and
 *  will help you easily debug problems in your resolving functions.
 *
 *  It will also help you control th error output of your resource methods and use error
 *  messages on the client! (More on that later).
 *
 *  The user resolver has been completed as an example of what you'll need to do.
 *  Finish of the rest of the resolvers when you're ready.
 */
const { ApolloError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const authMutations = require("./auth");
const { DateScalar } = require("../custom-types");

module.exports = app => {
  return {
    Date: DateScalar,

    Query: {
      viewer(parent, args, context, info) {
        if (context.token) {
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
      async itemowner({ ownerid }, args, { pgResource }) {
        try {
          const getItemOwner = await pgResource.getUserById(ownerid);
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
      async borrower(parent, args, { pgResource }) {
        try {
          if (parent.borrowerid) {
            const getBorrower = await pgResource.getUserById(parent.borrowerid);
            return getBorrower;
          }
          return null;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      created(parent) {
        let date = new Date(parent.created);
        let utcString = date.toUTCString();
        return parent.created;
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

        // return null

        //image = await image;
        //const user = await jwt.decode(context.token, app.get('JWT_SECRET'));
        const newItem = await context.pgResource.saveNewItem({
          item: args.item,
          //image: args.image,
          user: 1
        });
        return newItem;
      }
    }
  };
};
