import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { Category } from 'src/components'

const CategorySelect = ({
  categories,
  id,
  label,
  name,
  value,
  onChange,
  required = false,
  trackBy = '_id'
}) => {
  const labelId = `${id}-label`
  return (
    <FormControl fullWidth required={required}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        onChange={onChange}
      >
        {categories.map((category) => (
          <MenuItem
            key={category[trackBy]}
            value={category[trackBy]}
          >
            <Category label={name || category.name} color={category.color} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CategorySelect
