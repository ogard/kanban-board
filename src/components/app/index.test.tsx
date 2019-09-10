import React from 'react'
import ReactDOM from 'react-dom'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import App from './index'

const mockStore = configureMockStore()

it('renders without crashing', () => {
  const store = mockStore({ tasks: [], processing: null, filterText: null })
  const wrappedApp = (
    <Provider store={store}>
      <App />
    </Provider>
  )
  const div = document.createElement('div')
  ReactDOM.render(wrappedApp, div)
  ReactDOM.unmountComponentAtNode(div)
})
