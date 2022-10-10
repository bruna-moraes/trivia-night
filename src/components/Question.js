import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateScoreAction } from '../redux/actions';
import shuffleArray from '../utils/shuffleArray';

class Question extends React.Component {
  state = {
    answers: [],
    answered: false,
    timer: 30,
  };

  componentDidMount() {
    this.shuffleAnswers();
    this.startTimer();
  }

  componentDidUpdate() {
    const { timer, answered } = this.state;

    if (timer === 0 && !answered) {
      this.handleAnswer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  shuffleAnswers = () => {
    const {
      question: {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      },
    } = this.props;

    const answers = [...incorrectAnswers, correctAnswer];
    const shuffleAnswers = shuffleArray(answers);

    this.setState({
      answers: shuffleAnswers,
    });
  };

  handleAnswer = (answer) => {
    this.setState({
      answered: true,
    });

    clearInterval(this.interval);

    const {
      question: {
        correct_answer: correctAnswer,
        difficulty,
      },
      updateScore,
    } = this.props;
    const { timer } = this.state;

    if (answer === correctAnswer) {
      const minScore = 10;
      const dict = {
        easy: 1,
        medium: 2,
        hard: 3,
      };

      const score = minScore + (timer * dict[difficulty]);

      updateScore(score);
    }
  };

  startTimer = () => {
    const intervalTime = 1000;

    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, intervalTime);
  };

  render() {
    const { answers, answered, timer } = this.state;
    const {
      question: {
        category,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      },
    } = this.props;

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
        <span>
          { timer }
        </span>

        <div data-testid="answer-options">
          {
            answers.map((answer) => {
              if (answer === correctAnswer) {
                return (
                  <button
                    key={ answer }
                    type="button"
                    data-testid="correct-answer"
                    onClick={ () => this.handleAnswer(answer) }
                    className={ answered ? 'correct-answered' : '' }
                    disabled={ answered }
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
                  onClick={ () => this.handleAnswer(answer) }
                  className={ answered ? 'incorrect-answered' : '' }
                  disabled={ answered }
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
    difficulty: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ).isRequired,
  }).isRequired,
  updateScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch(updateScoreAction(score)),
});

export default connect(null, mapDispatchToProps)(Question);
