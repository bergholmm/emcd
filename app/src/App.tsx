import React, { useState, useEffect } from 'react'

import logo from 'assets/logo.svg'
import { fetchComics, Comic } from 'api'

const App = () => {
  const [comics, setComics] = useState([] as Comic[])

  useEffect(() => {
    const updateComics = async () => {
      const comics = await fetchComics()
      setComics(comics)
    }
    updateComics()
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>EMCD</p>
        {comics.length &&
          comics.map(comic => <img src={comic.img} alt='comic' />)}
      </header>
    </div>
  )
}

export default App
