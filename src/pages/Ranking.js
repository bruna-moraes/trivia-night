import React from 'react';
import PropTypes from 'prop-types';

import RankingCard from '../components/RankingCard';

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
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          players.map((player, index) => (
            <RankingCard
              key={ index }
              player={ player }
              index={ index }
            />
          ))
        }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goToHome }
        >
          Início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.array,
}.isRequired;

export default Ranking;
