import { createAction, ActionType } from 'typesafe-actions'
import { Task } from '../domains/task'
import { TaskState } from '../domains/taskState'

export const startAddTask = createAction('START_ADD_TASK', action => (taskState: TaskState) => action(taskState))

export const addTask = createAction('ADD_TASK', action => (task: Task) => action(task))

export const startEditTask = createAction('START_EDIT_TASK', action => (taskID: number) => action(taskID))

export const editTask = createAction(
  'EDIT_TASK',
  action => ({ taskID, taskDescription }: { taskID: number; taskDescription: null | string }) =>
    action({ taskID, taskDescription }),
)

export const removeTask = createAction('REMOVE_TASK', action => (taskID: number) => action(taskID))

export const startChangeTaskState = createAction('START_CHANGE_TASK_STATE', action => (taskID: number) =>
  action(taskID),
)

export const setTaskTempState = createAction('SET_TASK_TEMP_STATE', action => (taskState: TaskState) =>
  action(taskState),
)

export const changeTaskState = createAction(
  'CHANGE_TASK_STATE',
  action => ({ taskID, taskState }: { taskID: number; taskState: TaskState }) => action({ taskID, taskState }),
)

export const resetProcessing = createAction('RESET_PROCESSING')

const actions = {
  startAddTask,
  addTask,
  startEditTask,
  editTask,
  removeTask,
  startChangeTaskState,
  setTaskTempState,
  changeTaskState,
  resetProcessing,
}

export type Action = ActionType<typeof actions>
