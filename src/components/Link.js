// adapted from https://github.com/mui-org/material-ui/blob/master/examples/nextjs/src/Link.js

import { forwardRef } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Link as MuiLink } from '@material-ui/core'

const NextComposed = forwardRef((props, ref) => {
  const { as, href, ...other } = props
  return (
    <NextLink href={href} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  )
})

const Link = (props) => {
  const {
    href,
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props

  const router = useRouter()
  const pathname = typeof href === 'string' ? href : href.pathname
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName
  })

  if (naked) {
    return <NextComposed className={className} ref={innerRef} href={href} {...other} />
  }

  return (
    <MuiLink component={NextComposed} className={className} ref={innerRef} href={href} {...other} />
  )
}

export default forwardRef((props, ref) => <Link {...props} innerRef={ref} />)
