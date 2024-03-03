const initialState = {
  knife: null,
  glove: null,
  details: []
};

const skin = (state = initialState, action) => {
  switch (action.type) {
    case "SET_KNIFE":
      return {knife: action.payload};

    case "SET_GLOVE":
      return {glove: action.payload};

    case "SET_DETAILS_ALL":
      return {details: action.payload};

    default:
      return state;
  }
};

export default skin;
