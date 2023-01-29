import axios from "axios";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
  ADD_COMMENT_FAIL,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
} from "../reducers/post";

function AddPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    yield delay(1000);
    yield put({ type: ADD_POST_SUCCESS });
  } catch (err) {}
}

function AddCommentAPI(data) {
  return axios.post("/api/comment", data);
}

function* addComment(action) {
  try {
    yield delay(1000);
    yield put({ type: ADD_COMMENT_SUCCESS });
  } catch (err) {
    yield delay(1000);
    yield put({ type: ADD_COMMENT_FAIL });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
