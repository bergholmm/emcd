import React, { useEffect, useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { CircularProgress, Snackbar, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

import Dialog from '../containers/Dialog'
import ComicList from '../containers/ComicList'

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
    tile: {
      backgroundColor: '#fafafa',
    },
    titleBar: {
      backgroundColor: theme.palette.primary.main,
    },
    title: {
      color: theme.palette.primary.contrastText,
    },
    loader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fafafa',
      height: '100px',
      width: '100%',
    },
  })
)

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
  const [displayError, setDisplayError] = useState(false)

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

  useEffect(() => {
    setDisplayError(error)
  }, [error])

  console.log(isFetching)
  return (
    <div className={classes.root}>
      <Dialog />
      <ComicList />
      {isFetching && (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      )}
      <Snackbar
        classes={{ root: classes.titleBar }}
        open={displayError}
        autoHideDuration={6000}
        message='Ops, something went wrong!'
        action={
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={() => setDisplayError(!displayError)}>
            <Close fontSize='small' />
          </IconButton>
        }
      />
    </div>
  )
}

export default Explore
