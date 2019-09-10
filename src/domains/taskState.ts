export type TaskState = 'Todo' | 'InProgress' | 'Done'

export const displayName: { [P in TaskState]: string } = {
  Todo: 'TO DO',
  InProgress: 'IN PROGRESS',
  Done: 'DONE',
}
