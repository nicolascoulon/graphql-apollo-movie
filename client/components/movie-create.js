import React, { Component } from "react";
import { graphql } from "react-apollo";
import addMovieMutation from "../queries/createMovie";
import listMovieQueries from "../queries/listMovies";
import { hashHistory } from "react-router";

class MovieCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: "",
      errors: []
    };
  }

  onSubmit(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.props
        .mutate({
          variables: {
            title: this.state.terms
          }, // refresh les composants update du cache
          refetchQueries: [{ query: listMovieQueries }]
        })
        .then(() => {
          return hashHistory.push("/movies");
        })
        .catch(err => {
          const errorMessages = err.graphQLErrors.map(error => error.message);
          this.setState({ errors: errorMessages });
        });
    }
  }
  onChange(e) {
    this.setState({ terms: e.target.value });
  }

  renderErrors() {
    return this.state.errors.map(msg => msg);
  }

  render() {
    return (
      <div>
        <h1>Ajouter un film</h1>
        <form className="input-field col-s6">
          <input
            type="text"
            className="validate"
            onChange={this.onChange.bind(this)}
            onKeyPress={this.onSubmit.bind(this)}
          />
          <label className="active">Titre</label>
        </form>
        <div className="row errors">{this.renderErrors()}</div>
      </div>
    );
  }
}

export default graphql(addMovieMutation)(MovieCreate);
