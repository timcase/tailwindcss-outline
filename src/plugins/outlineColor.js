import _ from 'lodash'
import flattenColorPalette from '../util/flattenColorPalette'

export default function() {
  return function({ addUtilities, e, theme, variants }) {
    const colors = flattenColorPalette(theme('outlineColor'))

    const utilities = _.fromPairs(
      _.map(_.omit(colors, 'default'), (value, modifier) => {
        return [
          `.${e(`outline-${modifier}`)}`,
          {
            'outline-color': value,
          },
        ]
      })
    )

    addUtilities(utilities, variants('outlineColor'))
  }
}
