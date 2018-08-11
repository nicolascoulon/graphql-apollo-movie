import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { Link } from "react-router";
import CreateReview from "./review-create";
import ReviewList from "./review-list";
import readMovieQuery from "../queries/readMovie";

class MovieDetail extends Component {
  renderDetail() {
    const { readMovieQuery } = this.props;
    const { loading, movie } = readMovieQuery;
    if (loading) {
      return <div>Chargement....!!</div>;
    }
    return (
      <div>
        <h1>Detail du film : {movie.title}</h1>
        <Link to={"/movies"}>Retour aux films</Link>
        <ReviewList reviews={movie.reviews} />
        <CreateReview movieId={this.props.params.id} />
      </div>
    );
  }

  render() {
    return <div>{this.renderDetail()}</div>;
  }
}

const readMovieProps = graphql(readMovieQuery, {
  name: "readMovieQuery",
  options: props => {
    return {
      variables: {
        id: props.params.id
      }
    };
  }
});

export default compose(readMovieProps)(MovieDetail);
