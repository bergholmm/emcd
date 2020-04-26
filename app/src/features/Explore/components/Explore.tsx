import React, { useEffect } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import Dialog from '../containers/Dialog'
import ComicList from '../containers/ComicList'
import ErrorMessage from 'components/ErrorMessage'
import Loader from 'components/Loader'

interface Props {
  isFetching: boolean
  error: boolean
  fetchComics: () => void
}

const Explore: React.FunctionComponent<Props> = ({
  isFetching,
  error,
  fetchComics,
}) => {
  const classes = useStyles()

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isFetching
      )
        return
      else fetchComics()
    }

    window.addEventListener('scroll', handleScroll)
    fetchComics()

    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line
  }, [])

  return (
    <div className={classes.root}>
      <Dialog />
      <ComicList />
      <Loader isLoading={isFetching} />
      <ErrorMessage error={error} />
    </div>
  )
}

export default Explore

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      marginTop: '10px',
    },
  })
)
