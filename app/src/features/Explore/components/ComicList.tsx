import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import {
  GridList,
  GridListTile,
  GridListTileBar,
  withWidth,
} from '@material-ui/core'

import { Comic } from 'types'

interface Props {
  width: string
  comics: Comic[]
  onClick: (index: number) => void
}

const ComicList: React.FunctionComponent<Props> = ({
  width,
  comics,
  onClick,
}) => {
  const numCols = getNumCols(width)
  const classes = useStyles()

  return (
    <GridList cellHeight={285} cols={numCols} spacing={28}>
      {comics.map((comic, index) => (
        <GridListTile
          className={classes.tile}
          key={index}
          onClick={() => onClick(index)}>
          <img src={comic.img} alt={comic.title} />
          <GridListTileBar
            title={comic.title}
            titlePosition='top'
            classes={{ root: classes.titleBar, title: classes.title }}
          />
        </GridListTile>
      ))}
    </GridList>
  )
}

export default withWidth()(ComicList)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tile: {
      backgroundColor: '#fafafa',
    },
    titleBar: {
      backgroundColor: theme.palette.primary.main,
    },
    title: {
      color: theme.palette.primary.contrastText,
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
