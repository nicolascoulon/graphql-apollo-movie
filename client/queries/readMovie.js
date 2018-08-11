import gql from "graphql-tag";

export default gql`
  query readMovie($id: ID!) {
    movie(id: $id) {
      id
      title
      reviews {
        id
        content
        likes
      }
    }
  }
`;

//   query READ_MOVIE($id: ID!)  - !  -=> ID Obligatoire
