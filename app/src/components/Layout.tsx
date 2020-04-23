import React from 'react'
import {
  CssBaseline,
  Container,
  AppBar,
  Typography,
  Toolbar,
} from '@material-ui/core'

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <AppBar position='fixed'>
        <Container>
          <Toolbar>
            <Typography variant='h6'>EMCD</Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Container>{children}</Container>
    </>
  )
}

export default Layout
