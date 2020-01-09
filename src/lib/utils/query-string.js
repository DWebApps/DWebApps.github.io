export function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  const results = regex.exec(location.search)
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

export function getAssets() {
  const libraries = (getUrlParameter('a') + '')
    .split(',', 20)
    .filter(function(e) {
      return e
    })
  const scripts = libraries.map(function(library) {
    // js
    if (library === 'jquery' || library === 'jq') library = 'jQuery'
    if (library === 'vue') library = 'Vue'
    if (library === 'react') library = 'React'

    // styles
    if (library === 'twbs' || library === 'bs') library = 'bootstrap'
    return library
  })
  return scripts
}

export function getTxHash() {
  return getUrlParameter('tx')
}

export function getEncode() {
  return getUrlParameter('f') ? getUrlParameter('f') : 'hex'
}