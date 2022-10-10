// Action Types
export const ADD_INFO_LOGIN = 'ADD_INFO_LOGIN';
export const GET_GRAVATAR_IMG = 'GET_GRAVATAR_IMG';
export const UPDATE_SCORE = 'UPDATE_SCORE';

// Action para salvar o Name e o Email do usuário
export const addLogin = (payload) => ({
  type: ADD_INFO_LOGIN,
  payload,
});

export const updateScoreAction = (score) => ({
  type: UPDATE_SCORE,
  score,
});
