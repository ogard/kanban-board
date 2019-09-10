import { put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { ActionType, getType } from 'typesafe-actions'
import * as actions from './actions'
import { State } from './reducer'

export default function* saga() {
  yield takeLatest(getType(actions.startAddTask), onStartAddTask)
  yield takeEvery(
    [
      getType(actions.addTask),
      getType(actions.removeTask),
      getType(actions.editTask),
      getType(actions.changeTaskState),
    ],
    updateLocalSorage,
  )
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

function* updateLocalSorage() {
  const tasks = yield select((state: State) => state.tasks)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
