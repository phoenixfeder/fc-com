import * as actionTypes from '../utils/const-actiontypes';

const initialState = {
  statistics: {},
  loading: false,
  error: null,
};

const statsStart = state => ({ ...state, loading: true });

const statsSuccess = (state, action) => ({
  ...state,
  statistics: action.statistics,
  loading: false,
});

const statsFail = (state, action) => ({
  ...state,
  error: action.error,
  loading: false,
});

const statReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STATS_START:
      return statsStart(state);
    case actionTypes.STATS_SUCCESS:
      return statsSuccess(state, action);
    case actionTypes.STATS_FAIL:
      return statsFail(state, action);
    default:
      return state;
  }
};

export default statReducer;
