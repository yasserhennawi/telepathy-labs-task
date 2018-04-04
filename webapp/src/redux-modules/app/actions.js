export const REDIRECT_PAGE = "REDIRECT_PAGE";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const FETCH_TWEETS_REQUEST = "FETCH_TWEETS_REQUEST";
export const FETCH_TWEETS_SUCCESS = "FETCH_TWEETS_SUCCESS";
export const FETCH_TWEETS_FAILED = "FETCH_TWEETS_FAILED";
export const POST_TWEET_REQUEST = "POST_TWEET_REQUEST";
export const POST_TWEET_SUCCESS = "POST_TWEET_SUCCESS";
export const POST_TWEET_FAILED = "POST_TWEET_FAILED";
export const AUTH_ME_REQUEST = "AUTH_ME_REQUEST";
export const AUTH_ME_SUCCESS = "AUTH_ME_SUCCESS";
export const AUTH_ME_FAILED = "AUTH_ME_FAILED";

export const redirectPage = routeParam => ({ type: REDIRECT_PAGE, routeParam });

export const loginRequest = () => ({ type: LOGIN_REQUEST });

export const fetchTweetsRequest = payload => {
  const action = { type: FETCH_TWEETS_REQUEST };
  if (payload && payload.maxId) {
    action.payload = { maxId: payload.maxId };
  }
  return action;
};
export const fetchTweetsSuccess = tweets => ({
  type: FETCH_TWEETS_SUCCESS,
  payload: tweets
});
export const fetchTweetsFailed = error => ({
  type: FETCH_TWEETS_FAILED,
  error
});

export const postTweetRequest = ({ tweet }) => ({
  type: POST_TWEET_REQUEST,
  payload: tweet
});
export const postTweetSuccess = ({ tweet }) => ({
  type: POST_TWEET_SUCCESS,
  payload: tweet
});
export const postTweetFailed = error => ({
  type: POST_TWEET_FAILED,
  error
});
export const authMeRequest = () => ({
  type: AUTH_ME_REQUEST
});

export const authMeSuccess = ({ profile }) => ({
  type: AUTH_ME_SUCCESS,
  payload: profile
});

export const authMeFailed = error => ({
  type: AUTH_ME_FAILED,
  error
});
