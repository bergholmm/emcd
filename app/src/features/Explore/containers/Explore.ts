import { connect } from 'react-redux'
import Explore from 'features/Explore/components/Explore'
import { AsyncDispatch, RootState } from 'types'
import { fetchComicsAction } from 'features/Explore/store'

const mapStateToProps = ({ explore }: RootState) => ({
  isFetching: explore.isFetching,
  error: !!explore.errorMessage,
})

const mapDispatchToProps = (dispatch: AsyncDispatch) => {
  return {
    fetchComics: () => dispatch(fetchComicsAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore)
