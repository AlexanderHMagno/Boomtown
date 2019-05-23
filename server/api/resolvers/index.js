
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
const { ApolloError } = require('apollo-server-express');

// @TODO: Uncomment these lines later when we add auth
// const jwt = require("jsonwebtoken")
// const authMutations = require("./auth")
// -------------------------------
const { DateScalar } = require('../custom-types');

module.exports = app => {
  return {
    Date: DateScalar,
    

    Query: {
      viewer() {
        /**
         * @TODO: Authentication - Server
         *
         *  If you're here, you have successfully completed the sign-up and login resolvers
         *  and have added the JWT from the HTTP cookie to your resolver's context.
         *
         *  The viewer is what we're calling the current user signed into your application.
         *  When the user signed in with their username and password, an JWT was created with
         *  the user's information cryptographically encoded inside.
         *
         *  To provide information about the user's session to the app, decode and return
         *  the token's stored user here. If there is no token, the user has signed out,
         *  in which case you'll return null
         */
        return null;
      },
      async user(parent, { id }, { pgResource }, info) {
       return tryAndCatch(await pgResource.getUserById(id));
      },
      async items(parent, { filter }, { pgResource }, info) {
        return tryAndCatch(await pgResource.getSpecificItem(filter));//orignial getItems I changed to test this new Query.
      },
      async tags(parent, { id }, { pgResource }, info) {
        return tryAndCatch(await pgResource.getTags());
      }
    },

    User: {

      async items(parent, { id }, { pgResource }, info) {
        return tryAndCatch(await pgResource.getItemsForUser(parent.id));
      },
      async borrowed(parent, { id }, { pgResource }, info) {
        return tryAndCatch(await pgResource.getBorrowedItemsForUser(parent.id));        
      }
    },

    Item: {
      async itemowner(parent, { id }, { pgResource }, info) {
        return tryAndCatch(await pgResource.getUserById(parent.ownerid));
      },
      async tags(parent, { id }, { pgResource }, info) {
        return tryAndCatch(await pgResource.getTagsForItem(parent.id));
      },
      async borrower(parent, { id }, { pgResource }, info) {
        if(parent.borrowerid==null) return null;
        return tryAndCatch(await pgResource.getUserById(parent.borrowerid));
        // -------------------------------
      },
      created(){
        return null
      }
      
    },

    Mutation: {
      // @TODO: Uncomment this later when we add auth
      // ...authMutations(app),
      // -------------------------------

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
        user : 1
        });
        return newItem;
      }
    }    
  };
};


async function tryAndCatch(dataInfo,debug){
 if(debug) console.log(debug);
  try {
    if(Object.keys(dataInfo).length==0) return null;
      return dataInfo;
  } catch (e) {
    throw new ApolloError(e);
  }
}