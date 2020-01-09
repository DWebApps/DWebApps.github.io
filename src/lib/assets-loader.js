import resources from '../configs/resources'
import { getAssets } from './utils/query-string'
import { appendAssets } from './utils/append'

export function assetsLoader() {
  const assets = getAssets()
  assets.unshift('normalize', 'polyfill', 'modernizr')

  assets.forEach(function(library) {
    if (!library) return
    // source from assets
    if (resources.hasOwnProperty(library)) {
      appendAssets(resources[library])
    } else {
      // source from cdnjs api
      const name = library.split('^')[0]
      const version = library.split('^')[1]
      if (!version || version === 'latest') {
        fetch(
          new Request('https://api.cdnjs.com/libraries?search=' + name, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
        ).then(async function(resp) {
          const r = await resp.json()
          appendAssets(r.results[0].latest)
        })
      } else {
        appendAssets(
          'https://cdnjs.cloudflare.com/ajax/libs/' +
            name +
            '/' +
            version +
            '/' +
            name +
            '.min.js'
        )
      }
    }
  })
}
