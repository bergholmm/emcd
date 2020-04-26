import { connect } from 'react-redux'
import ComicList from 'features/Explore/components/ComicList'
import { AsyncDispatch, RootState } from 'types'
import { toggleDialog, setCurrentComic } from 'features/Explore/store'

const mapStateToProps = ({ explore }: RootState) => ({
  comics: explore.comics,
})

const mapDispatchToProps = (dispatch: AsyncDispatch) => {
  return {
    onClick: (index: number) => {
      dispatch(setCurrentComic(index))
      dispatch(toggleDialog())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComicList)
