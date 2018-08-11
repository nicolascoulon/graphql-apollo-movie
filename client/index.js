import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Router, Route, IndexRedirect, hashHistory } from "react-router";
// components
import "./style/style.css";
import MovieList from "./components/movie-list";
import MovieCreate from "./components/movie-create";
import MovieDetail from "./components/movie-detail";

const client = new ApolloClient({
  // force apollo cache to refresh on each mutations, only work when returning an object id
  dataIdFromObject: object => object.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/">
          <IndexRedirect to="movies" />
          <Route path="movies" component={MovieList} />
          <Route path="movies/create" component={MovieCreate} />
          <Route path="movie/:id" component={MovieDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
