import { Chip, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.common.white
  }
}))

const Category = ({ label, ...props }) => {
  const css = useStyles()

  return (
    <Chip
      label={label}
      className={css.root}
      {...props}
    />
  )
}

export default Category
