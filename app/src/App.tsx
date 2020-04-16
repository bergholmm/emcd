import React, { useState, useEffect } from 'react'

import logo from 'assets/logo.svg'
import { fetchLatestComic } from 'api'

const App = () => {
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetchLatestComic().then(status => setStatus(status.message))
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>EMCD</p>
        <p>{status}</p>
      </header>
    </div>
  )
}

export default App
