import React from 'react';
import Header from '../components/Header';
import Question from '../components/Question';
import fetchTrivia from '../services/fetchTrivia';

class Game extends React.Component {
  state = {
    questions: [],
    isLoading: true,
  };

  async componentDidMount() {
    await this.getQuestions();
  }

  getQuestions = async () => {
    // const token = localStorage.getItem('token');
    const token = 'f898c22ea128c068fec268e3803a8d6e86d7e8b66ff5a1e4ff008bd840207f6f';

    const questions = await fetchTrivia(token);

    this.setState({
      questions,
      isLoading: false,
    });
  };

  render() {
    const { questions, isLoading } = this.state;
    return (
      <>
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
      </>
    );
  }
}

export default Game;
