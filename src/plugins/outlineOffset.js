import _ from 'lodash';

export default function () {
  return function({ addUtilities, e, theme, variants }) {
    const generators = [
      (value, modifier) => ({
        [`.${e(`outline${modifier}`)}`]: { outlineWidth: `${value}` },
      })
    ]

    const utilities = _.flatMap(generators, generator => {
      return _.flatMap(theme('outlineOffset'), (value, modifier) => {
        return generator(value, modifier === 'default' ? '' : `-${modifier}`)
      })
    })

    addUtilities(utilities, variants('outlineOffset'))
  }
}
