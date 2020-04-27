const plugin = require('tailwindcss/plugin');
const _ = require('lodash');

const flattenColorPalette = function(colors) {
  return _(colors)
    .flatMap((color, name) => {
      if (!_.isPlainObject(color)) {
        return [[name, color]];
      }
      return _.map(color, (value, key) => {
        const suffix = key === 'default' ? '' : `-${key}`;
        return [`${name}${suffix}`, value];
      });
    })
    .fromPairs()
    .value();
};

const defaultTheme = {
 outlineColor: theme => ({
    ...theme('colors'),
    default: theme('colors.gray.300', 'currentColor'),
  }),
  outlineWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
      '8': '8px',
    },
  outlineOffset: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
      '8': '8px',
    }
}
module.exports = plugin(function({ theme, variants, e, addBase, addUtilities }) {
  const colorTheme = theme('outlineColor');
  const offsetTheme = theme('offsetTheme');
  const widthTheme = theme('outlineWidth');

  const defaultColor =
    _.defaults({}, colorTheme, defaultTheme.outlineColor).default;
  const defaultOffset =
    _.defaults({}, offsetTheme, defaultTheme.outlineOffset).default;
  const defaultWidth =
    _.defaults({}, widthTheme, defaultTheme.outlineWidth).default;

  const colors = flattenColorPalette(theme('outlineColor'))

  const colorUtilities = _.fromPairs(
    _.map(_.omit(colors, 'default'), (value, modifier) => {
      return [
        `.${e(`outline-${modifier}`)}`,
        {
          'outline-color': value,
        },
      ]
    })
  )

  const outlineOffsetGenerators = [
    (value, modifier) => ({
      [`.${e(`outline-offset${modifier}`)}`]: { outlineOffset: `${value}` },
    })
  ]

  const outlineOffsetUtilities =
    _.flatMap(outlineOffsetGenerators, generator => {
      return _.flatMap(theme('outlineOffset'), (value, modifier) => {
        return generator(value, modifier === 'default' ? '' : `-${modifier}`)
      })
    })

  const outlineWidthGenerators = [
    (value, modifier) => ({
      [`.${e(`outline-width${modifier}`)}`]: { outlineWidth: `${value}` },
    })
  ]

  const outlineWidthUtilities = _.flatMap(outlineWidthGenerators, generator => {
    return _.flatMap(theme('outlineWidth'), (value, modifier) => {
      return generator(value, modifier === 'default' ? '' : `-${modifier}`)
    })
  })

  addUtilities(
    {
      '.outline-dotted': {
        'outline-style': 'dotted',
      },
      '.outline-dashed': {
        'outline-style': 'dashed',
      },
      '.outline-solid': {
        'outline-style': 'solid',
      },
      '.outline-double': {
        'outline-style': 'double',
      },
      '.outline-groove': {
        'outline-style': 'groove',
      },
      '.outline-ridge': {
        'outline-style': 'ridge',
      },
      '.outline-inset': {
        'outline-style': 'inset',
      },
      '.outline-outset': {
        'outline-style': 'outset',
      },
      '.outline-none': {
        'outline-style': 'none',
      },
      '.outline-hidden': {
        'outline-style': 'hidden',
      }
    },
    variants('outlineStyle')
  )
  addUtilities(colorUtilities, variants('outlineColor'))
  addUtilities(outlineOffsetUtilities, variants('outlineOffset'))
  addUtilities(outlineWidthUtilities, variants('outlineWidth'))
}, {
  theme: defaultTheme,
  variants: {
    outlineStyle: ['responsive', 'hover', 'focus'],
    outlineColor: ['responsive', 'hover', 'focus'],
    outlineOffset: ['responsive', 'hover', 'focus'],
    outlineWidth: ['responsive', 'hover', 'focus']
  },
});
