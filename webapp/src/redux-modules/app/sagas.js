import { call, put, takeLatest } from "redux-saga/effects";
import history from "../../history";
import Cookies from "universal-cookie";
import "whatwg-fetch";
import {
  LOGIN_REQUEST,
  REDIRECT_PAGE,
  FETCH_TWEETS_REQUEST,
  POST_TWEET_REQUEST,
  AUTH_ME_REQUEST,
  fetchTweetsSuccess,
  fetchTweetsRequest,
  fetchTweetsFailed,
  postTweetSuccess,
  postTweetFailed,
  authMeSuccess,
  authMeFailed
} from "./actions";
const cookies = new Cookies();

const getHeaders = customHeaders => {
  const headers = Object.assign({}, customHeaders || {});
  headers["Content-Type"] = "application/json";
  return headers;
};
const loginOptions = customHeaders => ({
  method: "POST",
  headers: getHeaders(customHeaders),
  credentials: "same-origin"
});

function* login() {
  const api = "http://localhost:4000/api/v1/auth/twitter/reverse";
  try {
    const data = yield fetch(api, loginOptions()).then(data => data.json());
    window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${
      data.oauth_token
    }`;
  } catch (error) {
    console.log(error);
  }
}

function* redirectAfterLogin({ routeParam }) {
  const loginUrl = "http://localhost:4000/api/v1/auth/twitter";
  const api = `${loginUrl}${routeParam}`;
  try {
    yield fetch(api, loginOptions()).then(data => {
      cookies.set("access-token", data.headers.get("x-auth-token"));
      return data.json();
    });
    yield call(history.push, "/");
  } catch (error) {
    console.log("error in redirectAfterLogin :", error);
  }
}

function* authMe() {
  const api = "http://localhost:4000/api/v1/auth/me";
  const headers = {
    "x-auth-token": cookies.get("access-token")
  };
  const options = {
    method: "GET",
    headers: getHeaders(headers),
    credentials: "same-origin"
  };
  try {
    const apiData = yield fetch(api, options).then(data => data.json());
    yield put(authMeSuccess(apiData));
    yield put(fetchTweetsRequest());
  } catch (err) {
    yield put(authMeFailed(err));
  }
}

const getMaxId = payload => {
  if (payload && payload.maxId) {
    return `?maxId=${payload.maxId}`;
  }
  return "";
};

function* fetchTweets({ payload }) {
  const maxId = getMaxId(payload);
  const api = `http://localhost:4000/api/v1/tweets${maxId}`;
  const headers = {
    "x-auth-token": cookies.get("access-token")
  };
  const options = {
    method: "GET",
    headers: getHeaders(headers),
    credentials: "same-origin"
  };
  try {
    const tweets = yield fetch(api, options).then(data => data.json());
    if (maxId) {
      tweets.shift();
    }
    yield put(fetchTweetsSuccess(tweets));
  } catch (err) {
    yield put(fetchTweetsFailed(err));
  }
}

function* postTweet({ payload }) {
  const api = "http://localhost:4000/api/v1/tweet";
  const body = JSON.stringify({ status: payload });

  const headers = {
    "x-auth-token": cookies.get("access-token")
  };
  const options = {
    method: "POST",
    headers: getHeaders(headers),
    credentials: "same-origin",
    body
  };
  try {
    if (!payload) {
      throw new Error({
        message: "Can't post an empty tweet",
        code: 400
      });
    }
    const apiData = yield fetch(api, options).then(data => data.json());
    yield put(postTweetSuccess({ apiData }));
  } catch (err) {
    yield put(postTweetFailed(err));
  }
}

function* mySaga() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(REDIRECT_PAGE, redirectAfterLogin);
  yield takeLatest(FETCH_TWEETS_REQUEST, fetchTweets);
  yield takeLatest(AUTH_ME_REQUEST, authMe);
  yield takeLatest(POST_TWEET_REQUEST, postTweet);
}

export default mySaga;
