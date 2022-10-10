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
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
    }));
  };

  render() {
    const { questions, isLoading, shouldLogout, questionIndex } = this.state;

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
                        question={ questions[questionIndex] }
                        updateIndex={ this.updateIndex }
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
