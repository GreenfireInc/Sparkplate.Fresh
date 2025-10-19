/*
 * Contributors: Aciel Ochoa
 *
 * Description: Cypher Middleware is used for identifying tables/columns
 *  to encrypt/decrypt. To add an item, simply add an array of columns to
 *  the cypherParams object.
 */

import cypher from '../Cypher'

// cypherParams defines which tables and columns will use encryption
// tableName should be listed as the key, with columns listed
// as an array of strings
// statically mapped keys for exchange settings like apiSecret and apiPasswords have been removed
// All Exchange Settings related keys and values are stored as an object in the userSettings config under exchanges
export const cypherParams = {
  wallets: ['wif', 'privateKey'],
  users: ['googleAuthenticatorCode', 'mnemonic'],
  paperWallets: ['privateKey'],
  userSettings: ['emailConfigPassword', 'exchanges'],
  mnemonicPasswords: ['mpPrivateKey']
}

function handleEncryption(request, columns) {
  const query = request.query
  const isUpdate = request.name === 'update'
  // Store original values for return onResult
  // data gets set according to boolean isUpdate
  // use stringify to make sure data does not get mutated especially with nested object values
  // look into better ways for copying and working with objects without reference issues
  const originalValues = isUpdate
    ? JSON.parse(JSON.stringify(query.set))
    : query.values.map((entry) => JSON.parse(JSON.stringify(entry))) // use .map() to store a new instance of values

  // Encrypt defined columns and assign value to query.values/query.set
  for (const column of columns) {
    const objectKey = Object.keys(originalValues)
    const objectKeyAsString = objectKey.toString()
    const columnAsString = column.toString()
    // trapping to make sure the correct exchanges column is being used, look into refactoring this and find something more effecient
    if (objectKeyAsString === 'exchanges' && columnAsString === 'exchanges') {
      // special case for encrypting values inside the exchanges object that gets set in User Settings > Exchanges
      if (isUpdate) {
        for (const exchange in query.set[column]) {
          const encryptedObject = {
            active: query.set[column][exchange].active,
            apiKey: cypher.encrypt(query.set[column][exchange].apiKey),
            apiSecret: cypher.encrypt(query.set[column][exchange].apiSecret),
            apiPhrase: cypher.encrypt(query.set[column][exchange].apiPhrase)
          }
          query.set[column][exchange] = encryptedObject
        }
      } else {
        for (const entry of query.values) {
          if (entry[column]) entry[column] = cypher.encrypt(entry[column])
        }
      }
    } else {
      // end special case for exchanges, all over columns set here
      if (isUpdate) {
        if (query.set[column])
          query.set[column] = cypher.encrypt(query.set[column])
      } else {
        for (const entry of query.values) {
          if (entry[column]) entry[column] = cypher.encrypt(entry[column])
        }
      }
    }
  }
  // Restore original values for returning to client
  request.onResult((results) => {
    // Results will often be a number of updated/inserted rows
    // Only modify results when Array dataset is returned
    if (Array.isArray(results)) {
      return results.map((entry, i) => {
        for (const column of columns) {
          entry[column] = originalValues[i][column]
        }
        return entry
      })
    } else {
      return results
    }
  })
}

function handleDecryption(request, columns) {
  // Decrypt data prior to returning to client
  request.onResult((results) => {
    // NOTE: UI saves the unecrypted version of this data, make sure everything stays in sync
    return results.map((entry) => {
      for (const column of columns) {
        if (entry[column] && column === 'exchanges') {
          let decryptedObject
          for (const exchange in entry[column]) {
            decryptedObject = {
              active: entry[column][exchange].active,
              apiKey: cypher.decrypt(entry[column][exchange].apiKey),
              apiSecret: cypher.decrypt(entry[column][exchange].apiSecret),
              apiPhrase: cypher.decrypt(entry[column][exchange].apiPhrase)
            }
            entry[column][exchange] = decryptedObject
          }
        } else if (entry[column]) {
          const decrypted = cypher.decrypt(entry[column])
          entry[column] = decrypted
        }
      }
      return entry
    })
  })
}

export const cypherMiddleware = function (request) {
  const query = request.query

  // Cypher Middleware can be bypassed if the request query object contains { bypassCypherMiddleware: true }
  if (!query || query.bypassCypherMiddleware) return request

  switch (request.name) {
    case 'insert':
    case 'upsert':
      if (query.into in cypherParams) {
        handleEncryption(request, cypherParams[query.into])
      }
      break
    case 'update':
      if (query.in in cypherParams) {
        handleEncryption(request, cypherParams[query.in])
      }
      break
    case 'select':
      if (query.from in cypherParams) {
        handleDecryption(request, cypherParams[query.from])
      }
      break
    case 'clear':
    case 'count':
    case 'init_db':
    case 'remove':
      return request
    default:
      console.warn(
        `Unhandled database query(${request.name}) invoked cypherMiddleware.`,
        request
      )
  }
}
