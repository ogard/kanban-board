import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../../redux/actions'
import { State } from '../../redux/reducer'
import { Task } from '../../domains/task'
import { TaskState } from '../../domains/taskState'

import './index.css'

type StateProps = {
  editable: boolean
  newState: null | TaskState
  focused: boolean
}

type DispatchProps = {
  dispatch: Dispatch<actions.Action>
}

type OwnProps = {
  task: Task
}

type Props = StateProps & DispatchProps & OwnProps

const getBackgroundColor = (taskState: TaskState): string => {
  switch (taskState) {
    case 'Todo':
      return '#1E88E5'
    case 'InProgress':
      return '#e53935'
    case 'Done':
      return '#6D4C41'
    default:
      return ''
  }
}

const View: React.FunctionComponent<Props> = ({ task, newState, editable, focused, dispatch }) => {
  const [buttonVisible, setButtonVisibility] = React.useState(false)
  const backgroundColor = getBackgroundColor(task.state)
  return (
    <div
      draggable
      onDragStart={() => dispatch(actions.startChangeTaskState(task.id))}
      onDragEnd={() =>
        dispatch(
          newState && newState !== task.state
            ? actions.changeTaskState({ taskID: task.id, taskState: newState })
            : actions.resetProcessing(),
        )
      }
      onMouseOver={() => setButtonVisibility(true)}
      onMouseLeave={() => setButtonVisibility(false)}
      className="task-item"
      style={{ backgroundColor }}
    >
      <div className="task-item-button-wrapper">
        <button
          style={{ visibility: !buttonVisible ? 'hidden' : 'visible' }}
          className="task-item-button"
          onClick={() => dispatch(actions.removeTask(task.id))}
        >
          x
        </button>
      </div>
      <textarea
        rows={5}
        className="task-item-textarea"
        style={{ backgroundColor }}
        readOnly={!editable}
        autoFocus={focused}
        value={task.description || ''}
        onChange={event => {
          const eventValue = event.target.value
          dispatch(
            actions.editTask({
              taskID: task.id,
              taskDescription: eventValue.length > 0 ? eventValue : null,
            }),
          )
        }}
        onDoubleClick={() => dispatch(actions.startEditTask(task.id))}
        onBlur={() => editable && dispatch(actions.resetProcessing())}
      />
    </div>
  )
}

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => ({
  editable:
    state.processing != null &&
    state.processing.type === 'EditInProgress' &&
    state.processing.taskID === ownProps.task.id,
  newState:
    state.processing != null && state.processing.type === 'DragInProgress' ? state.processing.taskTempState : null,
  focused: state.filterText == null,
})

const mapDispatchToProps = (dispatch: Dispatch<actions.Action>, ownProps: OwnProps): DispatchProps => ({
  dispatch,
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default withConnect(View)
