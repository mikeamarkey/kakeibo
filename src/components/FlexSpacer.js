import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}))

const FlexSpacer = () => {
  const css = useStyles()

  return <div className={css.root} />
}

export default FlexSpacer
