import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const ErrorMessage: React.FunctionComponent<{ error: boolean }> = ({
  error,
}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(error)
  }, [error])

  return (
    <Snackbar open={open} autoHideDuration={6000}>
      <SnackbarContent
        classes={{ root: classes.content }}
        message='Ops, something went wrong!'
        action={
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={() => setOpen(!open)}>
            <Close fontSize='small' />
          </IconButton>
        }
      />
    </Snackbar>
  )
}

export default ErrorMessage

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      backgroundColor: theme.palette.primary.main,
    },
  })
)
