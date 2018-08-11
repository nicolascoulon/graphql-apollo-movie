import React, { Component } from "react";
import { graphql, compose, withApollo } from "react-apollo";
import createReviewMutation from "../queries/createReview";
import readMovieQuery from "../queries/readMovie";
import listMovieQueries from "../queries/listMovies";

class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: ""
    };
  }

  //   componentWillMount() {
  //     // withApollo
  //     this.props.client
  //       .query({ query: listMovieQueries })
  //       .then(result => console.log(result, "withApollo"))
  //       .catch(err => console.warn(err, "error"));
  //   }

  handleChange(e) {
    this.setState({ terms: e.target.value });
  }
  onSubmit(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.props
        .createReviewMutation({
          variables: {
            content: this.state.terms,
            movieId: this.props.movieId
          }
        })
        .then(() => this.setState({ terms: "" }));
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div className="row">
          <form className="input-field col s6">
            <input
              type="text"
              className="validate"
              onChange={this.handleChange.bind(this)}
              value={this.state.terms}
              onKeyPress={this.onSubmit.bind(this)}
            />
            <label className="active">Ajouter une review</label>
          </form>
        </div>
      </div>
    );
  }
}

const CreateReviewMutationProps = graphql(createReviewMutation, {
  name: "createReviewMutation"
});

export default compose(withApollo, CreateReviewMutationProps)(CreateReview);
