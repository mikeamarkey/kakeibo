import { makeStyles } from '@material-ui/core'
import { Category } from 'src/components'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    padding: theme.spacing(1),
    background: theme.palette.primary.main,
    overflowX: 'auto'
  }
}))

const Footer = ({ month, categories, setDialogContent }) => {
  const css = useStyles()

  return (
    <div className={css.footer}>
      {categories.map(({ _id, name }) => (
        <Category
          key={_id}
          label={name}
          onClick={() => {
            const date = moment().isSame(moment(month), 'month') ? undefined : month
            setDialogContent({
              category: _id,
              date: moment(date).format('YYYY-MM-DD'),
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
