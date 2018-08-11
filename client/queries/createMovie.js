import gql from "graphql-tag";

export default gql`
  mutation ADD_MOVIE($title: String) {
    addMovie(title: $title) {
      id
      title
    }
  }
`;
