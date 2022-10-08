export const ADD_LOGIN = 'ADD_LOGIN';
export const BTN_PLAY_API = 'BTN_PLAY_API';

export const addLogin = (payload) => ({
  type: ADD_LOGIN,
  payload,
});
export const btnPlayApi = (payload) => ({
  type: BTN_PLAY_API,
  payload,
});

export function getBtnPlayApi() {
  return async (dispatch) => {
    const fetchApi = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await fetchApi.json();
    return dispatch(btnPlayApi(response));
  };
}
