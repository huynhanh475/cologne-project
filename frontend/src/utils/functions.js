export const capitalizeFirstLetter = ([ first, ...rest ], locale = navigator.language) =>
  first === undefined ? '' : first.toLocaleUpperCase(locale) + rest.join('')