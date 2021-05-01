import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  ArrowBackIos,
  ArrowForwardIos,
  Close,
  Launch,
} from '@material-ui/icons'
import {
  Backdrop,
  Box,
  Card,
  CardContent,
  CardHeader,
  Fade,
  IconButton,
  Link,
  Modal,
  Typography,
} from '@material-ui/core'
import { Comic } from 'types'

interface Props {
  open: boolean
  comic: Comic
  next: () => void
  prev: () => void
  onClose: () => void
}

const Dialog: React.FunctionComponent<Props> = ({
  open,
  onClose,
  comic,
  next,
  prev,
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
            <IconButton onClick={prev}>
              <ArrowBackIos color='secondary' />
            </IconButton>
          </div>
          <Card className={classes.card}>
            <CardHeader
              title={
                <Typography component='h5' variant='h5'>
                  {comic?.title}
                </Typography>
              }
              action={
                <IconButton onClick={onClose}>
                  <Close color='primary' />
                </IconButton>
              }
            />
            <Box display='flex' justifyContent='center'>
              <img
                className={classes.media}
                src={comic?.img}
                alt='ComicImage'
              />
            </Box>
            <CardContent className={classes.content}>
              <Typography>{comic?.alt}</Typography>
              <Typography variant='subtitle1'>
                <Link href={comic?.img} target='_blank' rel='noopener'>
                  Source link <Launch style={{ fontSize: 14 }} />
                </Link>
              </Typography>
            </CardContent>
          </Card>
          <div className={classes.navigation}>
            <IconButton onClick={next}>
              <ArrowForwardIos color='secondary' />
            </IconButton>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default Dialog

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      display: 'flex',
      flex: 1,
      outline: '0',
      alignItems: 'center',
      justifyContent: 'space-between',
      [theme.breakpoints.down('xs')]: {
        height: '100%',
      },
    },
    card: {
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        height: '100%',
        overflow: 'scroll',
      },
    },
    media: {
      maxWidth: '100%',
      maxHeight: '720px',
    },
    content: {
      maxWidth: '350px',
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
