import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import './index.css';

import starIcon from '../../images/starIcon.svg';

class Header extends React.Component {
  state = {
    emailHASH: '',
  };

  componentDidMount() {
    this.transformHASH();
  }

  transformHASH = () => {
    const { emailGravatar } = this.props;
    const emailHASH = md5(emailGravatar).toString();
    this.setState({
      emailHASH,
    });
  };

  render() {
    const { name, score } = this.props;
    const { emailHASH } = this.state;
    return (
      <header>
        <div className="header-content">
          <div className="profile-container">
            <img
              className="profile-image"
              src={ `https://www.gravatar.com/avatar/${emailHASH}` }
              alt={ `Imagem do ${name}` }
              data-testid="header-profile-picture"
            />
            <h3 data-testid="header-player-name">{name}</h3>
          </div>
          <div className="score-container">
            <img
              className="star-icon"
              src={ starIcon }
              alt="Icone Estrela"
            />
            <span>Score:</span>
            <h3 data-testid="header-score">{ score }</h3>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailGravatar: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  emailGravatar: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
