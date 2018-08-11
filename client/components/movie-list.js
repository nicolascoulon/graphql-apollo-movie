import React, { Component } from "react";
import { Link } from "react-router";
import { graphql, compose, Query } from "react-apollo";
import listMovieQueries from "../queries/listMovies";
import deleteMovieMutation from "../queries/deleteMovie";

class MovieList extends Component {
  firstLetterCapitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  renderTrashButton(movieId) {
    return (
      <i
        className="material-icons secondary-content delete_button"
        onClick={() => this.onDeleteMovie(movieId)}
      >
        delete
      </i>
    );
  }
  onDeleteMovie(movieId) {
    this.props
      .deleteMovieMutation({
        variables: {
          id: movieId
        }
      }) // refetch des data , cache apollo
      .then(() => {
        this.props.listMovieQueries.refetch();
      });
  }

  renderMovies() {
    const { listMovieQueries } = this.props;
    const { movies, loading } = listMovieQueries;
    if (!loading) {
      return movies.map(movie => {
        return (
          <li key={movie.id} className="collection-item">
            <Link to={`/movie/${movie.id}`}>
              {this.firstLetterCapitalize(movie.title)}
            </Link>
            {this.renderTrashButton(movie.id)}
          </li>
        );
      });
    } else {
      return "Loading...";
    }
  }

  render() {
    return (
      <div>
        <h1>Liste de films</h1>
        <ul className="collection">{this.renderMovies()}</ul>
        <Link
          to="/movies/create"
          className="btn-floating btn-large waves-effect waves-light blue right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const ListMovieQueriesProps = graphql(listMovieQueries, {
  name: "listMovieQueries"
});

const DeleteMovieMutationProps = graphql(deleteMovieMutation, {
  name: "deleteMovieMutation"
});

export default compose(ListMovieQueriesProps, DeleteMovieMutationProps)(
  MovieList
);

// export default compose(
//   graphql(listMovieQueries, {
//     name: "listMovieQueries"
//   }),
//   graphql(deleteMovieMutation, {
//     name: "deleteMovieMutation"
//   })
// )(MovieList);
