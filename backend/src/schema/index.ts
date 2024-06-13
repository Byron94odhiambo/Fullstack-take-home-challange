import { gql } from 'apollo-server-core';



export const typeDefs = gql`
  type Book {
    author: String
    coverPhotoURL: String
    readingLevel: String
    title: String
  }

  type Query {
    books(title: String!): [Book]
  }
`;
