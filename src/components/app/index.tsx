import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { State } from '../../redux/reducer'
import * as actions from '../../redux/actions'
import Board from '../board'
import './index.css'

type StateProps = {
  filterText: string | null
}

type DispatchProps = {
  dispatch: Dispatch<actions.Action>
}

type Props = StateProps & DispatchProps

const App: React.FunctionComponent<Props> = ({ filterText, dispatch }) => {
  return (
    <div className="app">
      <input
        className="app-filter"
        placeholder="Filter tasks"
        value={filterText != null ? filterText : ''}
        onChange={event => {
          const eventValue = event.target.value
          dispatch(actions.changeFilterText(eventValue.length > 0 ? eventValue : null))
        }}
      />
      <Board />
    </div>
  )
}

const mapStateToProps = (state: State): StateProps => ({
  filterText: state.filterText,
})

const withConnect = connect(mapStateToProps)

export default withConnect(App)
