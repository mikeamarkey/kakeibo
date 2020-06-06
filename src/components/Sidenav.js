import { Drawer, List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import { Link } from 'src/components'

const useStyles = makeStyles((them) => ({
  list: {
    width: '250px'
  }
}))

const links = [
  { label: 'Transactions', url: '/' },
  { label: 'Categories', url: '/categories' }
]

const Sidenav = ({ open, setOpen }) => {
  const css = useStyles()

  return (
    <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
      <List className={css.list}>
        {links.map(({ url, label }) => (
          <ListItem key={url} button component={Link} href={url}>
            <ListItemText>{label}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidenav
