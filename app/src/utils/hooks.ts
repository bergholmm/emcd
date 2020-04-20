import { useState, useEffect } from 'react'

export const useInfiniteScroll = (callback: () => void) => {
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isFetching) return
    callback()
  }, [isFetching, callback])

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return
    setIsFetching(true)
  }

  return [isFetching, setIsFetching]
}
