import { CircularProgress, makeStyles } from '@material-ui/core'

const size = 80
const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: `calc(50% - ${size / 2}px)`,
    left: `calc(50% - ${size / 2}px)`
  }
}))

const Loading = () => {
  const css = useStyles()
  return (
    <CircularProgress className={css.root} size={size} />
  )
}

export default Loading
