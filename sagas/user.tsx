import axios from "axios";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
  FOLLOW_FAIL,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOG_IN_FAIL,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAIL,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_FAIL,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from "../reducers/user";

function loadUserAPI() {
  return axios.get("/user");
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({ type: LOAD_USER_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: LOAD_USER_FAIL, error: err.response.data });
  }
}

function logInAPI(data) {
  return axios.post("/user/login", data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({ type: LOG_IN_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: LOG_IN_FAIL, error: err.response.data });
  }
}

function* logOutAPI() {
  return axios.post("/user/logout");
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({ type: LOG_OUT_SUCCESS });
  } catch (err) {
    yield put({ type: LOG_OUT_FAIL, error: err.response.data });
  }
}

function signUpAPI(data) {
  return axios.post("/user", data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log("saga", result);
    yield put({ type: SIGN_UP_SUCCESS });
  } catch (err) {
    yield put({ type: SIGN_UP_FAIL, error: err.response.data });
  }
}

function followAPI(data) {
  return axios.post("/api/login", data);
}

function* follow(action) {
  // console.log(action);
  try {
    yield delay(1000);
    yield put({ type: FOLLOW_SUCCESS, data: action.data });
  } catch (err) {
    yield put({ type: FOLLOW_FAIL, error: err.response.data });
  }
}

function unfollowUpAPI(data) {
  return axios.post("/api/login", data);
}

function* unfollow(action) {
  try {
    yield delay(1000);
    yield put({ type: UNFOLLOW_SUCCESS, data: action.data });
  } catch (err) {
    yield put({ type: UNFOLLOW_FAIL, error: err.response.data });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
