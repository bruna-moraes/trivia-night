import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import Question from '../../components/Question';
import fetchTrivia from '../../services/fetchTrivia';
import './index.css';

import logo from '../../images/logo.svg';

class Game extends React.Component {
  state = {
    questions: [],
    isLoading: true,
    shouldLogout: false,
    questionIndex: 0,
  };

  async componentDidMount() {
    await this.getQuestions();
  }

  getQuestions = async () => {
    const token = localStorage.getItem('token');

    const { results, response_code: responseCode } = await fetchTrivia(token);

    const invalidToken = 3;

    this.setState({
      questions: results,
      isLoading: false,
      shouldLogout: responseCode === invalidToken,
    });
  };

  updateIndex = () => {
    const { questionIndex } = this.state;
    const { player, history } = this.props;
    const lastQuestionIndex = 4;

    if (questionIndex === lastQuestionIndex) {
      const localPlayers = JSON.parse(localStorage.getItem('players') || '[]');

      localStorage
        .setItem('players', JSON.stringify([...localPlayers, player]));

      history.push('/feedback');
    }

    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
    }));
  };

  render() {
    const { questions, isLoading, shouldLogout, questionIndex } = this.state;

    if (shouldLogout) return <Redirect to="/" />;

    return (
      <div className="game-page">
        <Header />
        {
          isLoading
            ? <span>Loading...</span>
            : (
              <main className="game-content">
                <img
                  className="logo page-logo"
                  src={ logo }
                  alt="logotipo"
                />
                <Question
                  question={ questions[questionIndex] }
                  updateIndex={ this.updateIndex }
                />
              </main>
            )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Game.propTypes = {
  history: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Game);
