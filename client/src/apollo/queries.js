import gql from "graphql-tag";

/**
 * Item and user-related queries and mutations.
 */

const ItemFields = gql`
  fragment ItemFields on Item {
    id
    title
    imageurl
    description
    created
    tags {
      id
      title
    }
    itemowner {
      id
      fullname
      email
      bio
    }
    borrower {
      id
      fullname
      email
      bio
    }
  }
`;

//# @TODO: Query an item by its id and return the ItemFields fragment.
export const ITEM_QUERY = Item_Id => {
  return gql`
  query {
    items(filter:${Item_Id}){
      ...ItemFields
    }
  }
  
  ${ItemFields}
`;
};

export const ALL_ITEMS_QUERY = gql`
  query items($filter: ID) {
    items(filter: $filter) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

// export const ALL_USER_ITEMS_QUERY = gql`
//   query user($id: ID!) {
//     # @TODO: Query the bio, email, fullname, items, and borrowed for the user by id
//     # Use the ItemFields fragment for the items and borrowed fields.
//   }
//   ${ItemFields}
// `;

// export const ALL_TAGS_QUERY = gql`
//   query {
//     # @TODO: Query the id and title fields for tags.
//   }
// `;

// export const ADD_ITEM_MUTATION = gql`
//   mutation addItem($item: NewItemInput!) {
//     # @TODO: Pass the item and image into the addItem mutation as arguments
//     # and return the new item id when the mutation is complete.
//   }
// `;

/**
 * Auth-related queries and mutations.
 */

export const VIEWER_QUERY = gql`
  query {
    viewer {
      id
      email
      fullname
      bio
    }
  }
`;
export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($user: SignupInput!) {
    signup(user: $user) {
      id
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($user: LoginInput!) {
    login(user: $user) {
      id
    }
  }
`;

// mutation login{
//   login(user:{
//     email:"admin"
//     password:"admin",
//   }){
// 	  id
//   }
// }
