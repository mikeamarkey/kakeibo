import { makeStyles } from '@material-ui/core'
import { Category } from 'src/components'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    display: 'flex',
    overflowX: 'auto',
    width: '100%',
    padding: theme.spacing(0.5),
    borderTop: `1px solid ${theme.palette.divider}`,
    background: theme.palette.common.white
  }
}))

const Footer = ({ month, categories, setDialogContent }) => {
  const css = useStyles()

  return (
    <div className={css.footer}>
      {categories.map((category) => (
        <Category
          key={category._id}
          label={category.name}
          color={category.color}
          onClick={() => {
            const date = moment().isSame(moment(month), 'month') ? undefined : month
            setDialogContent({
              category: category._id,
              createdAt: moment().unix(),
              date: moment(date).format('YYYY-MM-DD'),
              month: month,
              note: '',
              price: '',
              type: 'DAILY'
            })
          }}
        />
      ))}
    </div>
  )
}

export default Footer
