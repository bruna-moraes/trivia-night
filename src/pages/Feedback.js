import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  clickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  clickPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  message = () => {
    const { assertions } = this.props;
    const mediumResult = 3;
    if (assertions < mediumResult) return 'Could be better...';
    if (assertions >= mediumResult) return 'Well Done!';
  };
  
  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">Feedback</p>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.clickRanking }
        >
          Ranking
        </button>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.clickPlayAgain }
        >
          Jogar Novamente
        </button>
        <p data-testid="feedback-text">{ this.message() }</p>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
