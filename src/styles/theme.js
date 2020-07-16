import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

// adapted from https://material-ui.com global theme object
let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    background: {
      paper: '#fff',
      default: '#fff',
      gray: '#f5f5f5'
    }
  }
})

theme = responsiveFontSizes(theme)
export default theme
