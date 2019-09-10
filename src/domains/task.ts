import { TaskState } from './taskState'

export type Task = {
  id: number
  description: null | string
  state: TaskState
}
