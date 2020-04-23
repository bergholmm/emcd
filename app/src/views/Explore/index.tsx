import React, { useState, useEffect } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import {
  GridList,
  GridListTile,
  GridListTileBar,
  CircularProgress,
  withWidth,
} from '@material-ui/core'

import { fetchComics, Comic } from 'api'
import { useInfiniteScroll } from 'utils/hooks'
import ComicView from 'views/Comic'

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

const getNumCols = (width: string): number => {
  switch (width) {
    case 'xs':
      return 1
    case 'sm':
      return 2
    default:
      return 3
  }
}

const Explore: React.FunctionComponent<{ width: string }> = ({ width }) => {
  const classes = useStyles()

  const [comics, setComics] = useState([] as Comic[])
  const [nextComic, setNextComic] = useState(null as number | null)
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreComics)
  const [isOpen, setIsOpen] = useState(false)
  const [comic, setComic] = useState(null as Comic | null)

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

  const numCols = getNumCols(width)

  return (
    <div className={classes.root}>
      <ComicView open={isOpen} comic={comic} onClose={() => setIsOpen(false)} />
      <GridList cellHeight={285} cols={numCols} spacing={28}>
        {comics.map(comic => (
          <GridListTile
            className={classes.tile}
            key={comic.img}
            cols={1}
            onClick={() => {
              setIsOpen(true)
              setComic(comic)
            }}>
            <img src={comic.img} alt={comic.title} />
            <GridListTileBar
              title={comic.title}
              titlePosition='top'
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>
        ))}
      </GridList>
      {isFetching && (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      )}
    </div>
  )
}

export default withWidth()(Explore)
