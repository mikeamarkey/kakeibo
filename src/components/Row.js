import { Children } from 'react'
import { Paper, makeStyles } from '@material-ui/core'
import { DragHandle } from '@material-ui/icons'
import { SortableHandle } from 'react-sortable-hoc'
import clsx from 'clsx'

const DragElement = SortableHandle(({ className }) => (
  <div className={className}>
    <DragHandle />
  </div>
))

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    margin: `${theme.spacing(0.5)}px 0`
  },
  rowClickable: {
    cursor: 'pointer',
    '&:hover': {
      boxShadow: theme.shadows[2]
    },
    '&:active': {
      boxShadow: theme.shadows[4]
    }
  },
  drag: {
    alignSelf: 'center',
    marginRight: theme.spacing(1),
    padding: theme.spacing(1)
  }
}))

const Row = ({ children, className: classNameProp, withSort, ...props }) => {
  const css = useStyles()
  const rowClass = clsx(css.row, props.onClick && css.rowClickable, classNameProp)

  return (
    <Paper className={rowClass} square {...props}>
      {withSort && (
        <DragElement className={css.drag} />
      )}
      {Children.map(children, child => child)}
    </Paper>
  )
}

export default Row
