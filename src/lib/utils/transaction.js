import { getTxHash } from './query-string'

export async function getTxnFromClient(cb) {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum)
    await ethereum.enable()
  } else {
    window.web3 = new Web3(web3.currentProvider)
  }
  try {
    web3.eth.getTransaction(getTxHash(), function(error, txn) {
      if (error) {
        cb(error, txn)
        return
      }
      cb(null, txn)
    })
  } catch (error) {
    // User denied account access...
    cb(error)
  }
}

export function getTxnFromGateway(url, cb) {
  fetch(
    new Request(url, {
      method: 'POST',
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getTransactionByHash',
        params: [getTxHash()],
        id: 1
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  ).then(async function(resp) {
    const r = await resp.json()
    cb(null, r.result)
  })
}
