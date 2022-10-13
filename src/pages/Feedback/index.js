import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

import Header from '../../components/Header';
import './index.css';

import logo from '../../images/logo.svg';

class Feedback extends React.Component {
  state = {
    emailHASH: '',
  };

  componentDidMount() {
    this.transformHASH();
  }

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

  transformHASH = () => {
    const { emailGravatar } = this.props;
    const emailHASH = md5(emailGravatar).toString();
    this.setState({
      emailHASH,
    });
  };

  render() {
    const { name, score, assertions } = this.props;
    const { emailHASH } = this.state;

    return (
      <div className="feedback-page">
        <Header />
        <main className="feedback-content">
          <img
            className="logo page-logo"
            src={ logo }
            alt="logotipo"
          />
          <div className="feedback-container">
            <img
              className="feedback-profile-image"
              src={ `https://www.gravatar.com/avatar/${emailHASH}` }
              alt={ `Imagem do ${name}` }
              data-testid="header-profile-picture"
            />
            <h2 data-testid="feedback-text">{ this.message() }</h2>
            <div>
              <span>Você acertou </span>
              <span data-testid="feedback-total-question">{assertions}</span>
              <span> questões! Total de </span>
              <span data-testid="feedback-total-score">{score}</span>
              <span> pontos</span>
            </div>
          </div>
          <div className="feedback-button-container">
            <button
              className="blue-button"
              type="button"
              data-testid="btn-ranking"
              onClick={ this.clickRanking }
            >
              Ranking
            </button>
            <button
              className="pink-button"
              type="button"
              data-testid="btn-play-again"
              onClick={ this.clickPlayAgain }
            >
              Jogar Novamente
            </button>
          </div>
        </main>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  emailGravatar: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
