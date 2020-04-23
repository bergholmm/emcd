import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import {
  Modal,
  Backdrop,
  Fade,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core'

import { Comic } from 'api/index'

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
)

interface Props {
  open: boolean
  onClose: () => void
  comic: Comic | null
}

const ComicView: React.FunctionComponent<Props> = ({
  open,
  onClose,
  comic,
}) => {
  const classes = useStyles()
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={open}>
        <Card>
          <img src={comic?.img} alt='Comic' />
          <div>
            <CardContent>
              <Typography component='h5' variant='h5'>
                {comic?.title}
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                {comic?.num}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </Fade>
    </Modal>
  )
}

export default ComicView
