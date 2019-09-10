import React from 'react'

import ListComponent from '../list'
import { TaskState, displayName } from '../../domains/taskState'
import './index.css'

const Board: React.FunctionComponent = () => {
  return (
    <div className="board">
      {Object.keys(displayName).map(key => (
        <ListComponent key={key} listState={key as TaskState} />
      ))}
    </div>
  )
}

export default Board
