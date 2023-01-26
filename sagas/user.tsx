import axios from "axios";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";

// function logInAPI(data) {
//   return axios.post("/api/login", data);
// }

function* logIn(action) {
  try {
    yield delay(1000);
    yield put({ type: "LOG_IN_SUCCESS", data: action.data });
  } catch (err) {
    yield put({ type: "LOG_IN_FAIL", data: err.response.data });
  }
}

function* logOut() {
  try {
    yield delay(1000);
    yield put({ type: "LOG_OUT_SUCCESS" });
  } catch (err) {}
}

function* watchLogIn() {
  yield takeLatest("LOG_IN_REQUEST", logIn);
}

function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
