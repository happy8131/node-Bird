import axios from "axios";
import { all, fork, call, put, take, takeEvery } from "redux-saga/effects";

import postSaga from "./post";
import userSaga from "./user";

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}

//fork는 함수를 실행한다 비동기 함수 호출, call은 동기 함수 호출 call에서 yield는 await 역할을 해준다
//take는 액션이 실행될때까지 기다리겠다 그리고 take는 한번 받게 못쓴다 그래서 takeEvery를 사용하면된다.
//put을 디스패치로 생각하면 된다.
//takeLatest는 여러번 눌러도 마지막것만 실행된다
//첫번째꺼만 실행은 takeLeading
//throttle 요청 시간에 한번만 보낼수 있다 ex 2초에 한번
