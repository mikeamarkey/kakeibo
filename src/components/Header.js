import { useContext } from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { AuthContext } from 'src/lib/auth'

const Header = ({ headerElements, setOpen, title }) => {
  const authContext = useContext(AuthContext)
  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        {authContext && (
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open menu'
            onClick={() => setOpen(true)}
          >
            <Menu />
          </IconButton>
        )}

        <Typography variant='h6'>Kakeibo{title && ` | ${title}`}</Typography>

        {headerElements}

      </Toolbar>
    </AppBar>
  )
}

export default Header
