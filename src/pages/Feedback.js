import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  clickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  clickPlayAgain = () => {
    const { history } =this.props;
    history.push('/');
  }

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

      <button
      type="button"
      data-testid="btn-play-again"
      onClick={ this.clickPlayAgain }
      >
        Jogar Novamente
      </button>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.array,
}.isRequired;

export default connect()(Feedback);
