import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

import RankingCard from '../../components/RankingCard/RankingCard';

import logo from '../../images/logo.svg';

class Ranking extends React.Component {
  goToHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  getPlayersRanking = () => {
    const players = JSON.parse(localStorage.getItem('players') || '[]');
    players.sort((a, b) => b.score - a.score);
    return players;
  };

  render() {
    const players = this.getPlayersRanking();
    return (
      <div className="ranking-page">
        <main className="ranking-content">
          <img
            className="logo page-logo"
            src={ logo }
            alt="logotipo"
          />
          <h1 data-testid="ranking-title">Ranking</h1>
          <div className="ranking-container">
            {
              players.map((player, index) => (
                <RankingCard
                  key={ index }
                  player={ player }
                  index={ index }
                />
              ))
            }
          </div>
          <button
            className="pink-button"
            type="button"
            data-testid="btn-go-home"
            onClick={ this.goToHome }
          >
            Play again
          </button>
        </main>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.array,
}.isRequired;

export default Ranking;
