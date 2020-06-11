import { colors } from '@material-ui/core'

export const colorArray = Object.keys(colors).reduce((acc, key) => {
  if (key === 'common') {
    return acc
  }

  const color = colors[key]
  const hues = [200].map((hue) => {
    return color[hue]
  })
  return acc.concat(hues)
}, [])

export function getUnusedColor (usedColors) {
  const unusedColors = colorArray.filter((color) => !usedColors.includes(color))
  const color = unusedColors.length
    ? unusedColors[Math.floor(Math.random() * unusedColors.length)]
    : colorArray[Math.floor(Math.random() * colorArray.length)]

  return color
}
