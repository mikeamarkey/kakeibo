import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

const Header = ({ extraComponent, setOpen }) => {
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

        {extraComponent}

      </Toolbar>
    </AppBar>
  )
}

export default Header
