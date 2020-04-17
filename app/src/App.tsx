import React, { useState, useEffect } from 'react'

import logo from 'assets/logo.svg'
import { fetchLatestComic, Comic } from 'api'

const App = () => {
  const [latestComic, setLatestComic] = useState(undefined as Comic | undefined)

  useEffect(() => {
    fetchLatestComic().then(comic => setLatestComic(comic))
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>EMCD</p>
        {latestComic && <img src={latestComic.img} alt='comic' />}
      </header>
    </div>
  )
}

export default App
