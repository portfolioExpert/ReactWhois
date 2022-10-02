import { all, takeEvery, call, put, takeLeading } from 'redux-saga/effects';
import { Types, actions } from '.';
import { callApi } from '../../common/util/api';
import { deleteApiCache, makeFetchSaga } from '../../common/util/fetch';


function* fetchUser({ name }) {
    const { isSuccess, data } = yield call(callApi, {
        url: '/user/search',
        params: { keyword: name },
    });

    if (isSuccess && data) {
        const user = data.find(item => item.name === name);
        if (user) {
            yield put(actions.setValue('user', user));
        }
    }
}

function* fetchUpdateUser({ user, key, value }) {
    const oldValue = user[key];
    yield put(actions.setValue('user', { ...user, [key]: value }));
    const { isSuccess, data } = yield call(callApi, {
        url: '/user/update',
        method: 'post',
        data: { name: user.name, key, value, oldValue },
    });

    if (isSuccess && data) {
        deleteApiCache();
        yield put(actions.addHistory(data.history));
    }
    else {
        yield put(actions.setValue('user', user));
    }
}

function* fetchUserHistory({ name }) {
    const { isSuccess, data } = yield call(callApi, {
        url: '/history',
        params: { name },
    });
    if (isSuccess && data) {
        yield put(actions.setValue('userHistory', data));
    }
}

export default function* () {
    yield all([
        takeEvery(
            Types.FetchUser,
            //값을 true로 입력하면 정해진 시간동안 해당 API가 응답하는 값을 캐싱
            makeFetchSaga({ fetchSaga: fetchUser, canCache: true }),
        ),
        takeLeading(
            Types.FetchUpdateUser,
            makeFetchSaga({ fetchSaga: fetchUpdateUser, canCache: false }),
        ),
        takeLeading(
            Types.FetchUserHistory,
            makeFetchSaga({ fetchSaga: fetchUserHistory, canCache: false }),
        ),
    ]);
}