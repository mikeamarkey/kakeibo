import { useState, useContext } from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core'

import { AuthContext } from 'src/lib/auth'
import { Header, Sidenav } from 'src/components'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr',
    height: '100%',
    backgroundColor: theme.palette.background.gray
  },
  content: {
    overflowY: 'auto',
    marginTop: theme.spacing(1),
    paddingBottom: theme.spacing(10)
  }
}))

const Layout = ({ children, headerElements, title }) => {
  const css = useStyles()
  const authContext = useContext(AuthContext)
  const [open, setOpen] = useState(false)

  return (
    <>
      <Head>
        <title>Kakeibo{title && ` | ${title}`}</title>
      </Head>

      <div className={css.root}>
        <Header
          setOpen={setOpen}
          headerElements={headerElements}
          title={title}
        />

        <div className={css.content}>
          {children}
        </div>
      </div>

      {authContext && (
        <Sidenav open={open} setOpen={setOpen} />
      )}
    </>
  )
}

export default Layout
