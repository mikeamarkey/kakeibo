import Router from 'next/router'
import moment from 'moment'

const routeInfo = {
  index: {
    month: {
      type: 'pattern',
      pattern: /^\d{6}$/,
      default: moment().format('YYYYMM')
    },
    tab: {
      type: 'map',
      map: {
        monthly: 1
      },
      default: 0
    }
  }
}

function setRoute (page, query = {}) {
  switch (page) {
    case 'index': {
      const mergedQuery = { ...Router.router.query, ...query }
      const newQuery = Object.keys(mergedQuery).reduce((acc, key) => {
        if (['month', 'tab'].includes(key) && mergedQuery[key]) {
          acc.push(`${key}=${mergedQuery[key]}`)
        }
        return acc
      }, []).join('&')
      const path = newQuery.length <= 0 ? '/' : `/?${newQuery}`
      return Router.replace(path, undefined, { shallow: true })
    }
  }
}

function getRouteState () {
  let initialState = {}
  const query = Router.router.query

  switch (Router.router.pathname) {
    case '/': {
      initialState = Object.keys(routeInfo.index).reduce((acc, key) => {
        const info = routeInfo.index[key]
        const cur = query[key]

        if (!info || !cur) {
          acc[key] = info.default
        } else if (info.type === 'pattern') {
          acc[key] = String(cur.match(info.pattern)) ? cur : info.default
        } else if (info.type === 'map') {
          acc[key] = info.map[cur] ? info.map[cur] : info.default
        }

        return acc
      }, {})
      break
    }
  }

  return initialState
}

export { getRouteState, setRoute }
