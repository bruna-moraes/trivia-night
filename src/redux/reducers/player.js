import { ADD_INFO_LOGIN, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_INFO_LOGIN: {
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
      score: 0,
      assertions: 0,
    };
  }
  case UPDATE_SCORE: {
    return {
      ...state,
      assertions: state.assertions + 1,
      score: state.score + action.score,
    };
  }
  default:
    return state;
  }
}

export default player;
