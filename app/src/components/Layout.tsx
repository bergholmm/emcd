import React from 'react'
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles'
import { CssBaseline, Container, AppBar, Toolbar } from '@material-ui/core'
import BlurOnIcon from '@material-ui/icons/BlurOn'

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

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      padding: '0',
    },
  })
)

const Layout: React.FunctionComponent = ({ children }) => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position='fixed'>
        <Container maxWidth='md'>
          <Toolbar className={classes.appBar}>
            <BlurOnIcon fontSize='large' />
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Container maxWidth='md'>{children}</Container>
    </ThemeProvider>
  )
}

export default Layout
