import { Chip, makeStyles } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    padding: theme.spacing(1),
    background: theme.palette.primary.main,
    overflowX: 'auto'
  },
  chip: {
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.common.white
  }
}))

const Footer = ({ month, categories, setDialogContent }) => {
  const css = useStyles()

  return (
    <div className={css.footer}>
      {categories.map((category) => (
        <Chip
          key={category._id}
          label={category.name}
          className={css.chip}
          onClick={() => {
            const date = moment().isSame(moment(month), 'month') ? undefined : month
            setDialogContent({
              category: category._id,
              date: moment(date).format('YYYY-MM-DD'),
              id: uuidv4(),
              month: month,
              note: '',
              price: ''
            })
          }}
        />
      ))}
    </div>
  )
}

export default Footer
