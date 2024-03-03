import { createStore } from "redux";
import { combineReducers } from "redux";

import skin from "./modules/skin.js";

const rootReducer = combineReducers({
  skin: skin,
});

const store = createStore(rootReducer);

export default store;
