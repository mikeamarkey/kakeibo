import { createMuiTheme } from '@material-ui/core/styles'

// adapted from https://material-ui.com/customization/palette/#dark-mode

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#a6d4fa',
      main: '#90caf9',
      dark: '#648dae'
    },
    secondary: {
      light: '#f6a5c0',
      main: '#f48fb1',
      dark: '#aa647b'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f'
    },
    warning: {
      light: '#ffb74d',
      main: '#ff9800',
      dark: '#f57c00'
    },
    info: {
      light: '#64b5f6',
      main: '#2196f3',
      dark: '#1976d2'
    },
    success: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c'
    }
  }
})

export default theme
