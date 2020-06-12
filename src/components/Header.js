import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

const Header = ({ headerElements, setOpen, title }) => {
  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open menu'
          onClick={() => setOpen(true)}
        >
          <Menu />
        </IconButton>

        <Typography variant='h6'>Kakeibo{title && ` | ${title}`}</Typography>

        {headerElements}

      </Toolbar>
    </AppBar>
  )
}

export default Header
