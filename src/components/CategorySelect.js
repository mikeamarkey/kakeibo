import { FormControl, InputLabel, MenuItem, Select, makeStyles } from '@material-ui/core'
import { Category } from 'src/components'

const useStyles = makeStyles((theme) => ({
  renderValues: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}))

const CategorySelect = ({
  categories,
  emptyName,
  label,
  name,
  size = 'medium',
  trackBy = '_id',
  selectProps = {},
  formControlProps = {},
  ...props
}) => {
  const labelId = `${selectProps.id}-label`
  const css = useStyles()
  return (
    <FormControl {...formControlProps}>
      {!label && <InputLabel id={labelId}>{label}</InputLabel>}
      <Select
        {...selectProps}
        labelId={labelId}
        displayEmpty={!!emptyName}
        renderValue={selectProps.multiple && ((selected) => (
          <div className={css.renderValues}>
            {selected.length <= 0 ? (
              <Category size={size} label={emptyName} />
            ) : (
              <>
                {selected.map((item) => {
                  const category = categories.find(category => category[trackBy] === item)
                  return (
                    <Category size={size} key={category[trackBy]} label={category.name} color={category.color} />
                  )
                })}
              </>
            )}
          </div>
        ))}
        {...props}
      >
        {!selectProps.multiple && emptyName && (
          <MenuItem
            value=''
          >
            <Category size={size} label={emptyName} />
          </MenuItem>
        )}
        {categories.map((category) => (
          <MenuItem
            key={category[trackBy]}
            value={category[trackBy]}
          >
            <Category size={size} label={name || category.name} color={category.color} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CategorySelect
