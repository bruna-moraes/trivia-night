import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';

class Ranking extends React.Component {
  goToHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <Header />
        <div>
          <h1 data-testid="ranking-title">Ranking</h1>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.goToHome }
          >
            Início
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.array,
}.isRequired;

export default Ranking;
