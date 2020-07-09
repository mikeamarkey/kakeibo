import { CircularProgress, makeStyles } from '@material-ui/core'
import clsx from 'clsx'

const size = 80
const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    height: '100%'
  },
  dim: {
    backgroundColor: 'rgba(255, 255, 255, .5)'
  },
  loading: {
    position: 'absolute',
    top: `calc(50% - ${size / 2}px)`,
    left: `calc(50% - ${size / 2}px)`
  }
}))

const Loading = ({ dim = false }) => {
  const css = useStyles()
  return (
    <div className={clsx(css.root, dim && css.dim)}>
      <CircularProgress className={css.loading} size={size} />
    </div>
  )
}

export default Loading
