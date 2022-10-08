import { ADD_INFO_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: '',
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_INFO_LOGIN: {
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  }
  default:
    return state;
  }
}

export default player;
