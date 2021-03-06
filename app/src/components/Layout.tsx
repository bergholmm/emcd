import React from 'react'
import BlurOnIcon from '@material-ui/icons/BlurOn'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline, Container, AppBar, Toolbar } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#fff',
    },
  },
})

const Layout: React.FC<{ children: React.ReactElement }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppBar position='fixed'>
      <Container maxWidth='md'>
        <Toolbar>
          <BlurOnIcon id='logo' fontSize='large' />
        </Toolbar>
      </Container>
    </AppBar>
    <Toolbar />
    <Container maxWidth='md'>{children}</Container>
  </ThemeProvider>
)

export default Layout
