import { Action } from './actions'
import { Task } from '../domains/task'
import { TaskState } from '../domains/taskState'

export type State = {
  tasks: Array<Task>
  processing:
    | null
    | { type: 'EditInProgress'; taskID: number }
    | { type: 'DragInProgress'; taskID: number; taskTempState: null | TaskState }
}

const initialState: State = {
  tasks: [], // TODO: initialize from local storage
  processing: null,
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] }
    case 'START_EDIT_TASK':
      return { ...state, processing: { type: 'EditInProgress', taskID: action.payload } }
    case 'EDIT_TASK': {
      const { taskID, taskDescription } = action.payload
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === taskID) {
            return { ...task, description: taskDescription }
          }
          return task
        }),
      }
    }
    case 'REMOVE_TASK': {
      const taskID = action.payload
      const targetIndex = state.tasks.findIndex(task => taskID === task.id)
      if (targetIndex > -1) {
        return {
          ...state,
          tasks: [...state.tasks.slice(0, targetIndex), ...state.tasks.slice(targetIndex + 1)],
          processing: null,
        }
      }
      return state
    }
    case 'START_CHANGE_TASK_STATE': {
      return { ...state, processing: { type: 'DragInProgress', taskID: action.payload, taskTempState: null } }
    }
    case 'SET_TASK_TEMP_STATE': {
      if (state.processing && state.processing.type === 'DragInProgress') {
        return {
          ...state,
          processing: { ...state.processing, taskTempState: action.payload },
        }
      }
      return state
    }
    case 'CHANGE_TASK_STATE': {
      const { taskID, taskState } = action.payload
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === taskID) {
            return { ...task, state: taskState }
          }
          return task
        }),
        processing: null,
      }
    }
    case 'RESET_PROCESSING':
      return { ...state, processing: null }
    default:
      return state
  }
}
