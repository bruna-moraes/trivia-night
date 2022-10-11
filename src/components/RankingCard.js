import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class RankingCard extends React.Component {
  state = {
    emailHASH: '',
  };

  componentDidMount() {
    this.transformHASH();
  }

  transformHASH = () => {
    const { player: { emailGravatar } } = this.props;
    const emailHASH = md5(emailGravatar).toString();
    this.setState({
      emailHASH,
    });
  };

  render() {
    const { player: { name, score }, index } = this.props;

    const { emailHASH } = this.state;
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${emailHASH}` }
          alt={ `Imagem do ${name}` }
          data-testid="player-profile-picture"
        />
        <h3 data-testid={ `player-name-${index}` }>{name}</h3>
        <h3 data-testid={ `player-score-${index}` }>{ score }</h3>
      </div>
    );
  }
}

RankingCard.propTypes = {
  emailGravatar: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default RankingCard;
