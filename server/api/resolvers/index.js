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
        //image = await image;
        const user = await jwt.decode(context.token, app.get("JWT_SECRET"));
        const newItem = await context.pgResource.saveNewItem({
          item: args.item,
          user: user
        });
        return newItem;
      }
    }
  };
};
