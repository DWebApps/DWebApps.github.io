import hex2a from './encoding'

export function appendScript(asset) {
  const script = document.createElement('script')
  script.src = asset.src
  script.crossOrigin = 'anonymous'
  script.async = false
  script.type = 'text/javascript'
  if (asset.hasOwnProperty('integrity')) script.integrity = asset.integrity
  document.body.appendChild(script)
}

export function appendStylesheet(asset) {
  const link = document.createElement('link')
  link.href = asset.src
  link.rel = 'stylesheet'
  link.type = 'text/css'
  if (asset.hasOwnProperty('integrity')) link.integrity = asset.integrity
  link.crossOrigin = 'anonymous'
  document.head.appendChild(link)
}

export function appendAssets(asset) {
  if (typeof asset === 'string') {
    if (asset.substring(asset.lastIndexOf('.') + 1) === 'css')
      appendStylesheet({
        src: asset
      })
    if (asset.substring(asset.lastIndexOf('.') + 1) === 'js')
      appendScript({
        src: asset
      })
  } else if (Array.isArray(asset)) {
    asset.forEach(function (a) {
      if (a.src.substring(a.src.lastIndexOf('.') + 1) === 'css')
        appendStylesheet(a)
      if (a.src.substring(a.src.lastIndexOf('.') + 1) === 'js') appendScript(a)
    })
  }
}

export function appendHTML(el, hex) {
  document.getElementById(el).innerHTML += hex2a(hex)
}
