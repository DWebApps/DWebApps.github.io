import gateway from '../configs/gateway'
import { getAssets, getTxHash, getEncode } from './utils/query-string'

import { getTxnFromClient, getTxnFromGateway } from './utils/transaction'
import { appendHTML } from './utils/append'

export async function renderWebApp(el) {
  if (!getTxHash()) return
  if (window.ethereum || window.web3) {
    getTxnFromClient(function(error, txn) {
      if (error) {
        console.log(error)
        console.log(
          'User refuse permission for this site'
        )
        getTxnFromGateway(gateway.ethereum, function(error, txn) {
          if (error) console.log(error)
          else appendHTML(el, txn.input, getEncode())
        })
      } else if (!txn) {
        console.log('The txn is null, please switch network to Mainnet')
        getTxnFromGateway(gateway.ethereum, function (error, txn) {
          if (error) console.log(error)
          else appendHTML(el, txn.input, getEncode())
        })
      } else appendHTML(el, txn.input, getEncode())
    })
  } else {
    console.log(
      'Non-Ethereum browser detected. You should consider trying MetaMask!'
    )
    getTxnFromGateway(gateway.ethereum, function(error, txn) {
      if (error) console.log(error)
      else appendHTML(el, txn.input, getEncode())
    })
  }
}

export default function() {
  let loop = 0
  const el = 'distributed-web-content'
  document.addEventListener(
    'DOMContentLoaded',
    function load() {
      const loaded = []
      const libraries = getAssets()
      libraries.some(function(library) {
        if (!window[library]) {
          loop += 1
          if (loop >= 8) {
            renderWebApp(el)
            return true
          }
          setTimeout(load, 200)
          return true
        } else {
          loaded.push(library)
        }
      })
      if (loaded.length === libraries.length) renderWebApp(el)
    },
    false
  )
}
