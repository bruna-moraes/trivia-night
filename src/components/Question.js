import React from 'react';
import PropTypes from 'prop-types';
import shuffleArray from '../utils/shuffleArray';

class Question extends React.Component {
  state = {
    answered: false,
  };

  handleAnswer = () => {
    this.setState({
      answered: true,
    });
  };

  render() {
    const { answered } = this.state;
    const {
      question: {
        category,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      },
    } = this.props;

    const answers = [...incorrectAnswers, correctAnswer];
    const shuffleAnswers = shuffleArray(answers);

    return (
      <div>
        <span
          data-testid="question-category"
        >
          {category}
        </span>
        <span
          data-testid="question-text"
        >
          {question}
        </span>

        <div data-testid="answer-options">
          {
            shuffleAnswers.map((answer) => {
              if (answer === correctAnswer) {
                return (
                  <button
                    key={ answer }
                    type="button"
                    data-testid="correct-answer"
                    onClick={ () => this.handleAnswer() }
                    className={ answered ? 'correct-answered' : '' }
                  >
                    {correctAnswer}
                  </button>
                );
              }

              const index = incorrectAnswers.indexOf(answer);

              return (
                <button
                  key={ answer }
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  onClick={ () => this.handleAnswer() }
                  className={ answered ? 'incorrect-answered' : '' }
                >
                  {answer}
                </button>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ).isRequired,
  }).isRequired,
};

export default Question;
