import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import reducer from "./root-reducer";

// const middlewares = [logger];
const store = createStore(reducer, applyMiddleware(logger));

export default store;
