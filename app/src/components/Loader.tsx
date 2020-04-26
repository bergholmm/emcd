import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'

const Loader: React.FunctionComponent<{ isLoading: boolean }> = ({
  isLoading,
}) => {
  const classes = useStyles()

  if (!isLoading) return <></>

  return (
    <div className={classes.loader}>
      <CircularProgress />
    </div>
  )
}

export default Loader

const useStyles = makeStyles(() =>
  createStyles({
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
