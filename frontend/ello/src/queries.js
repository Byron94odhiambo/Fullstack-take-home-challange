import { gql } from '@apollo/client';

export const BOOKS_QUERY = gql`
  query Books($title: String!) {
    books(title: $title) {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;
