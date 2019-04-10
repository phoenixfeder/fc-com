import { store } from '../store';

const state = store.getState();

export const authObject = {
  authentication: {
    session: state.auth.session,
    hash: state.auth.sessionHash,
  },
};
