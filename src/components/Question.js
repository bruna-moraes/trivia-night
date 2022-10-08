import React from 'react';
import PropTypes from 'prop-types';
import shuffleArray from '../utils/shuffleArray';

class Question extends React.Component {
  render() {
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
        {
          shuffleAnswers.map((answer) => {
            if (answer === correctAnswer) {
              return (
                <button
                  key={ answer }
                  type="button"
                  data-testid="correct-answer"
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
              >
                {answer}
              </button>
            );
          })
        }

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
