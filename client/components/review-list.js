import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import likeReviewMutation from "../queries/likeReview";

class ReviewList extends Component {
  renderReviewList() {
    if (this.props.reviews) {
      return this.props.reviews.map((review, i) => {
        return (
          <ul className="collection" key={i}>
            <li key={review.id} className="collection-item">
              {review.content}
              <div className="secondary-content delete_button">
                <i
                  className="material-icons "
                  onClick={() => this.handleLikes(review.id, review.likes)}
                >
                  thumb_up
                </i>
                {review.likes}
              </div>
            </li>
          </ul>
        );
      });
    }
    return null;
  }
  handleLikes(id, oldLikes) {
    this.props.likeReviewMutation({
      variables: {
        id: id
      },
      optimisticResponse: {
        __typename: "Mutation",
        likeReview: {
          id: id,
          __typename: "ReviewType",
          likes: oldLikes + 1
        }
      }
    });
  }

  render() {
    return <div>{this.renderReviewList()}</div>;
  }
}

const LikeReviewMutationProps = graphql(likeReviewMutation, {
  name: "likeReviewMutation"
});

export default compose(LikeReviewMutationProps)(ReviewList);
