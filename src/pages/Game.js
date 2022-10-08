import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Question from '../components/Question';
import fetchTrivia from '../services/fetchTrivia';

class Game extends React.Component {
  state = {
    questions: [],
    isLoading: true,
    shouldLogout: false,
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

  render() {
    const { questions, isLoading, shouldLogout } = this.state;
    return (
      <div>
        {
          shouldLogout
            ? <Redirect to="/" />
            : (
              <div>
                <Header />
                {
                  isLoading
                    ? <span>Loading...</span>
                    : (
                      <Question
                        question={ questions[0] }
                      />
                    )
                }
              </div>
            )
        }
      </div>
    );
  }
}

export default Game;
