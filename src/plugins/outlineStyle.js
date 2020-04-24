export default function() {
  return function({ addUtilities, variants }) {
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
  }
}
