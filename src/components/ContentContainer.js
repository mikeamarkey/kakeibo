import { Container, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'auto'
  },
  container: {
    marginTop: theme.spacing(1),
    paddingBottom: theme.spacing(10)
  }
}))

const ContentContainer = ({ children }) => {
  const css = useStyles()

  return (
    <div className={css.root}>
      <Container className={css.container} maxWidth='sm' disableGutters>
        {children}
      </Container>
    </div>
  )
}

export default ContentContainer
