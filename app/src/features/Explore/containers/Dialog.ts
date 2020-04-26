import { connect } from 'react-redux'
import Dialog from 'features/Explore/components/Dialog'
import { AsyncDispatch, RootState } from 'types'
import {
  getComic,
  toggleDialog,
  nextComic,
  prevComic,
} from 'features/Explore/store'

const mapStateToProps = ({ explore }: RootState) => ({
  open: explore.isDialogOpen,
  comic: getComic(explore, explore.currentComic),
})

const mapDispatchToProps = (dispatch: AsyncDispatch) => {
  return {
    next: () => dispatch(nextComic()),
    prev: () => dispatch(prevComic()),
    onClose: () => dispatch(toggleDialog()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog)
