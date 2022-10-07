import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    return (
      <header>
        <img src="x" alt="x" data-testid="header-profile-picture" />
        <h3 data-testid="header-player-name">Nome do Jogador</h3>
        <h3 data-testid="header-score">Score do Jogador</h3>
      </header>
    );
  }
}

export default connect()(Header);
