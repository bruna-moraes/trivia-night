import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  clickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    return (
      <div>
        <h1>Feedback</h1>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.clickRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.array,
}.isRequired;

export default connect()(Feedback);
