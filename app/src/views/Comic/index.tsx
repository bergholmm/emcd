import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import {
  Modal,
  Backdrop,
  Fade,
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@material-ui/core'

import { Comic } from 'api/index'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      outline: '0',
      display: 'flex',
      alignItems: 'center',
    },
    media: {
      maxWidth: '100%',
      maxHeight: '620px',
    },
    navigation: {
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
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
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}>
      <Fade in={open}>
        <div className={classes.container}>
          <div className={classes.navigation}>
            <IconButton>
              <ArrowBackIos color='secondary' />
            </IconButton>
          </div>
          <Card>
            <img className={classes.media} src={comic?.img} alt='ComicImage' />
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
          <div className={classes.navigation}>
            <IconButton>
              <ArrowForwardIos color='secondary' />
            </IconButton>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default ComicView
