import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../../redux/actions'
import { State } from '../../redux/reducer'

import { TaskState, displayName } from '../../domains/taskState'
import { Task } from '../../domains/task'
import TaskComponent from '../task'

import './index.css'

type StateProps = {
  tasks: Array<Task>
  draggingInProgress: boolean
}

type DispatchProps = {
  dispatch: Dispatch<actions.Action>
}

type OwnProps = {
  listState: TaskState
}

type Props = StateProps & DispatchProps & OwnProps

type BackgroundColor = {
  header: string
  body: string
  bodyHovered: string
}

const getBackgroundColors = (taskState: TaskState): BackgroundColor => {
  switch (taskState) {
    case 'Todo':
      return { header: 'rgba(13,71,161 ,1)', body: 'rgba(100,181,246 ,1)', bodyHovered: 'rgba(66,165,245 ,1)' }
    case 'InProgress':
      return { header: 'rgba(183,28,28 ,1)', body: 'rgba(229,115,115 ,1)', bodyHovered: 'rgba(239,83,80 ,1)' }
    case 'Done':
      return { header: 'rgba(62,39,35 ,1)', body: 'rgba(161,136,127 ,1)', bodyHovered: 'rgba(141,110,99 ,1)' }
    default:
      return { header: '', body: '', bodyHovered: '' }
  }
}

const View: React.FunctionComponent<Props> = ({ tasks, listState, draggingInProgress, dispatch }) => {
  const backgroundColors = getBackgroundColors(listState)
  const [bodyBackgroundColor, setBodyBackgroundColor] = React.useState(backgroundColors.body)
  return (
    <div className="task-list">
      <div className="task-list-header" style={{ backgroundColor: backgroundColors.header }}>
        <div>{displayName[listState]}</div>
        <div>{`(${tasks.length})`}</div>
        <div className="task-list-button-wrapper">
          <button
            className="task-list-button"
            disabled={draggingInProgress}
            onClick={() => dispatch(actions.startAddTask(listState))}
          >
            +
          </button>
        </div>
      </div>
      <div
        className="task-list-body"
        style={{ backgroundColor: bodyBackgroundColor }}
        onDragEnter={() => {
          if (draggingInProgress) {
            dispatch(actions.setTaskTempState(listState))
            setBodyBackgroundColor(backgroundColors.bodyHovered)
          }
        }}
        onDragLeave={() => {
          setBodyBackgroundColor(backgroundColors.body)
        }}
      >
        {tasks.map(task => (
          <TaskComponent key={task.id.toString()} task={task} />
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => ({
  tasks: state.tasks.filter(task => task.state === ownProps.listState),
  draggingInProgress: state.processing != null && state.processing.type === 'DragInProgress',
})

const mapDispatchToProps = (dispatch: Dispatch<actions.Action>, ownProps: OwnProps): DispatchProps => ({
  dispatch,
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default withConnect(View)
