/* eslint-disable @typescript-eslint/no-explicit-any */
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { TestActions } from './TestSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import Api from '@/utils/Api'
import APIConfig from '@/constants/APIConfig'

export function* watchTestSaga() {
    yield all([
        takeLatest(TestActions.testActionRequest.type, handleGetMyProfile),
      ])
}

function* handleGetMyProfile(action: PayloadAction<any>) {
    yield put(TestActions.testActionSuccess({}))
}

