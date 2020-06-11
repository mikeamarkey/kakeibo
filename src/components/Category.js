import { Chip, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      opacity: 0.92
    }
  }
}))

const Category = ({ color, label, size = 'medium', ...props }) => {
  const css = useStyles()

  return (
    <Chip
      size={size}
      variant='outlined'
      label={label}
      className={css.root}
      style={color && {
        backgroundColor: color
      }}
      {...props}
    />
  )
}

export default Category
