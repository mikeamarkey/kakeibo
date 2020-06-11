import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from '@material-ui/core'
import { Category, Receipt } from '@material-ui/icons'
import { Link } from 'src/components'

const useStyles = makeStyles((them) => ({
  list: {
    width: '250px'
  }
}))

const links = [
  { label: 'Transactions', url: '/', icon: <Receipt /> },
  { label: 'Categories', url: '/categories', icon: <Category /> }
]

const Sidenav = ({ open, setOpen }) => {
  const css = useStyles()

  return (
    <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
      <List className={css.list}>
        {links.map(({ url, label, icon }) => (
          <ListItem
            key={url}
            underline='none'
            color='textPrimary'
            button
            component={Link}
            href={url}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidenav
