import { put, takeLatest } from 'redux-saga/effects'
import { ActionType, getType } from 'typesafe-actions'
import * as actions from './actions'

export default function* saga() {
  yield takeLatest(getType(actions.startAddTask), onStartAddTask)
}

function* onStartAddTask(action: ActionType<typeof actions.startAddTask>) {
  const newTask = {
    id: new Date().valueOf(),
    description: null,
    state: action.payload,
  }
  yield put(actions.addTask(newTask))
  yield put(actions.startEditTask(newTask.id))
}
