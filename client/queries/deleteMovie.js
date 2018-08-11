import gql from "graphql-tag";

export default gql`
  mutation DELETE_MOVIE($id: ID) {
    deleteMovie(id: $id) {
      id
      title
    }
  }
`;
