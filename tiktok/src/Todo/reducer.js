import { SET_ACTION, ADD_ACTION, REMOVE_ACTION } from './constants';

export const initState = {
  job: '',
  jobs: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ACTION:
      return {
        ...state,
        job: action.payload,
      };

    case ADD_ACTION:
      return {
        ...state,
        jobs: [...state.jobs, action.payload],
      };

    case REMOVE_ACTION:
      const jobsAfferRemove = state.jobs.filter(
        (element, index) => index !== action.payload
      );
      return {
        ...state,
        jobs: [...jobsAfferRemove],
      };

    default:
      throw new Error('Invalid...');
  }
};

export default reducer;
