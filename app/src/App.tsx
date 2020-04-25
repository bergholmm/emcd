import React from 'react'
import { Provider } from 'react-redux'

import Layout from 'components/Layout'
import Explore from 'features/Explore'
import store from 'store'

const App = () => {
  return (
    <Provider store={store()}>
      <Layout>
        <Explore />
      </Layout>
    </Provider>
  )
}

export default App
