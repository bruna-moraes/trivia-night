import React from 'react';
import PropTypes from 'prop-types';
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

  handleAnswer = () => {
    this.setState({
      answered: true,
    });

    clearInterval(this.interval);
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
      updateIndex,
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
                    onClick={ () => this.handleAnswer() }
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
                  onClick={ () => this.handleAnswer() }
                  className={ answered ? 'incorrect-answered' : '' }
                  disabled={ answered }
                >
                  {answer}
                </button>
              );
            })
          }
        </div>

        { answered ? (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ updateIndex }
          >
            Next
          </button>
        ) : null}
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
  updateIndex: PropTypes.func.isRequired,
};

export default Question;
