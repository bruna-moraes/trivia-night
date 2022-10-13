import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

import './index.css';

import starIcon from '../../images/starIcon.svg';

class RankingCard extends React.Component {
  state = {
    emailHASH: '',
  };

  componentDidMount() {
    this.transformHASH();
  }

  transformHASH = () => {
    const { player: { gravatarEmail } } = this.props;
    const emailHASH = md5(gravatarEmail).toString();
    this.setState({
      emailHASH,
    });
  };

  render() {
    const { player: { name, score }, index } = this.props;

    const { emailHASH } = this.state;
    return (
      <div className="ranking-card">
        <div className="ranking-profile-container">
          <img
            className="ranking-profile-image"
            src={ `https://www.gravatar.com/avatar/${emailHASH}` }
            alt={ `Imagem do ${name}` }
            data-testid="player-profile-picture"
          />
          <h3 data-testid={ `player-name-${index}` }>{name}</h3>
        </div>
        <div className="ranking-score-container">
          <img
            className="ranking-star-icon"
            src={ starIcon }
            alt="Icone Estrela"
          />
          <span>Score:</span>
          <h3 data-testid={ `player-score-${index}` }>{ score }</h3>
        </div>
      </div>
    );
  }
}

RankingCard.propTypes = {
  player: PropTypes.shape({
    gravatarEmail: PropTypes.string,
    name: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
}.isRequired;

export default RankingCard;
