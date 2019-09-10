import React from 'react'
import './index.css'

import ListComponent from '../list'

import { TaskState, displayName } from '../../domains/taskState'

const App: React.FunctionComponent = () => {
  return (
    <div className="board">
      {Object.keys(displayName).map(key => (
        <ListComponent key={key} listState={key as TaskState} />
      ))}
    </div>
  )
}

export default App
