import * as types from '../constants/types';

const INITIAL_STATE = {
  loading: false,
  error: '',
  brewTimerCountdown: 3,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};