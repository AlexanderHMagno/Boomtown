const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Date

  enum Role {
    VIEWER
  }

  directive @auth on OBJECT | FIELD_DEFINITION

  type Item @auth {
    id: ID!
    title: String!
    imageurl: String
    description: String!
    itemowner: User!
    tags: [Tag]
    created: Date
    borrower: User
  }

  type User @auth {
    id: ID!
    email: String!
    fullname: String!
    bio: String
    items: [Item]
    borrowed: [Item]
    password: String!
  }

  type Tag {
    id: ID!
    title: String!
  }

  type File {
    id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
    itemid: ID!
  }

  input AssignedTag {
    id: ID!
    title: String!
  }

  input AssignedBorrower {
    id: ID!
  }
  input AssignedOwner {
    id: ID!
  }

  input NewItemInput {
    title: String!
    description: String
    owner: [AssignedOwner]!
    borrower: [AssignedBorrower]
    tags: [AssignedTag]!
  }

  type Query {
    user(id: ID!): User
    viewer: User
    items(filter: ID): [Item]
    tags: [Tag]
  }

  input SignupInput {
    email: String!
    fullname: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Mutation {
    signup(user: SignupInput!): User
    addItem(item: NewItemInput!): Item
    login(user: LoginInput): User
    logout: Boolean!
  }
`;
