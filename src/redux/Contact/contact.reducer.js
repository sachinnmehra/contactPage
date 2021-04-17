const INITIAL_STATE = {
  currentUser: null,
};

const contactReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};
export default contactReducer;
