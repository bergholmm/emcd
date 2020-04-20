import React, { useState, useEffect } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import {
  GridList,
  GridListTile,
  CssBaseline,
  Container,
  GridListTileBar,
  AppBar,
  Typography,
  Toolbar,
} from '@material-ui/core'

import { fetchComics, Comic } from 'api'
import { useInfiniteScroll } from 'utils/hooks'

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
    gridList: {},
    tile: {
      backgroundColor: '#fafafa',
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  })
)

const App = () => {
  const classes = useStyles()
  const [comics, setComics] = useState([] as Comic[])
  const [nextComic, setNextComic] = useState(null as number | null)
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreComics)

  async function fetchMoreComics() {
    const data = await fetchComics(nextComic)
    setComics([...comics, ...data.comics])
    setNextComic(data.next)
    // @ts-ignore
    setIsFetching(false)
  }

  useEffect(() => {
    const updateComics = async () => {
      const data = await fetchComics()
      setNextComic(data.next)
      setComics(data.comics)
    }
    updateComics()
  }, [])

  return (
    <>
      <CssBaseline />
      <AppBar position='fixed'>
        <Container>
          <Toolbar>
            <Typography variant='h6'>EMCD</Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />

      <Container>
        <div className={classes.root}>
          <GridList
            className={classes.gridList}
            cellHeight={260}
            cols={3}
            spacing={28}>
            {comics.map(comic => (
              <GridListTile className={classes.tile} key={comic.img} cols={1}>
                <img src={comic.img} alt={comic.title} />
                <GridListTileBar
                  title={comic.title}
                  classes={{
                    root: classes.titleBar,
                  }}
                />
              </GridListTile>
            ))}
          </GridList>
          {isFetching && 'Fetching more comics...'}
        </div>
      </Container>
    </>
  )
}

export default App
