import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateScoreAction } from '../../redux/actions';
import shuffleArray from '../../utils/shuffleArray';
import './index.css';

const answerLetterDict = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
};

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

  goToNextQuestion = async () => {
    const { updateIndex } = this.props;

    await updateIndex();

    this.setState({
      answered: false,
      timer: 30,
    });

    this.shuffleAnswers();
    this.startTimer();
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
      <div className="question-container">
        <div className="question-content">
          <section className="question-section">
            <h2
              data-testid="question-category"
            >
              {category}
            </h2>
            <p
              data-testid="question-text"
            >
              {question}
            </p>
            <span>
              { timer }
            </span>
          </section>
          <section
            data-testid="answer-options"
            className="answers-section"
          >
            {
              answers.map((answer, index) => {
                if (answer === correctAnswer) {
                  return (
                    <div
                      className="answer-container"
                      key={ answer }
                    >
                      <p className="answer-letter">{answerLetterDict[index]}</p>
                      <button
                        data-testid="correct-answer"
                        type="button"
                        onClick={ () => this.handleAnswer(answer) }
                        className={ answered ? 'correct-answered answer' : 'answer' }
                        disabled={ answered }
                      >
                        {answer}
                      </button>
                    </div>
                  );
                }
                const incorrectAnswerIndex = incorrectAnswers.indexOf(answer);
                return (
                  <div
                    className="answer-container"
                    key={ answer }
                  >
                    <p className="answer-letter">{answerLetterDict[index]}</p>
                    <button
                      data-testid={ `wrong-answer-${incorrectAnswerIndex}` }
                      type="button"
                      onClick={ () => this.handleAnswer(answer) }
                      className={ answered ? 'incorrect-answered answer' : 'answer' }
                      disabled={ answered }
                    >
                      {answer}
                    </button>
                  </div>
                );
              })
            }
          </section>
        </div>

        {
          answered
            ? (
              <button
                className="pink-button next-button"
                data-testid="btn-next"
                type="button"
                onClick={ this.goToNextQuestion }
              >
                Next
              </button>
            )
            : null
        }

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
  updateIndex: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch(updateScoreAction(score)),
});

export default connect(null, mapDispatchToProps)(Question);
