import { combineReducers } from "redux";
import {
  HELLO_WORLD,
  FETCH_TWEETS_SUCCESS,
  POST_TWEET_SUCCESS,
  AUTH_ME_SUCCESS,
  AUTH_ME_FAILED
} from "./actions";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

const initialState = {
  profile: null,
  postedTweet: "",
  homeTimeline: [],
  authUser: false,
  authResponded: false
};

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HELLO_WORLD:
      return Object.assign({}, state, {
        testing: "Opaaaa7"
      });
    case FETCH_TWEETS_SUCCESS:
      return Object.assign({}, state, {
        homeTimeline: [...state.homeTimeline, ...payload]
      });
    case POST_TWEET_SUCCESS:
      return Object.assign({}, state, {
        postedTweet: payload
      });
    case AUTH_ME_SUCCESS:
      return Object.assign({}, state, {
        profile: payload,
        authUser: true,
        authResponded: true
      });
    case AUTH_ME_FAILED:
      return Object.assign({}, state, {
        authUser: false,
        authResponded: true
      });
    default:
      return state;
  }
};

export default combineReducers({
  routerReducer,
  form: formReducer,
  app: appReducer
});
