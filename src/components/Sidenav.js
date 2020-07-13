import Router from 'next/router'
import { useMutation } from '@apollo/client'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from '@material-ui/core'
import { Category, ExitToApp, Receipt } from '@material-ui/icons'
import { LOGOUT } from 'src/graphql/queries'
import { removeAuthData } from 'src/lib/auth'
import { Link } from 'src/components'

const useStyles = makeStyles((theme) => ({
  list: {
    width: theme.spacing(32)
  }
}))

const links = [
  { label: 'Transactions', url: '/', icon: <Receipt /> },
  { label: 'Categories', url: '/categories', icon: <Category /> }
]

const Sidenav = ({ open, setOpen }) => {
  const css = useStyles()
  const [logout] = useMutation(LOGOUT, {
    update (store, { data: { logout } }) {
      removeAuthData()
      Router.reload()
    }
  })

  return (
    <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
      <List className={css.list}>
        {links.map(({ url, label, icon }, idx) => (
          <ListItem
            key={url}
            color='textPrimary'
            button
            component={Link}
            href={url}
            divider={idx === links.length - 1}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}

        <ListItem
          color='textPrimary'
          button
          onClick={() => logout()}
        >
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>

      </List>
    </Drawer>
  )
}

export default Sidenav
