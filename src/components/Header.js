import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

const Header = ({ headerElements, setOpen }) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open menu'
          onClick={() => setOpen(true)}
        >
          <Menu />
        </IconButton>

        <Typography variant='h6'>Kakeibo</Typography>

        {headerElements}

      </Toolbar>
    </AppBar>
  )
}

export default Header
