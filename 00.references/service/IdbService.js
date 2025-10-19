// JS Store Module
import { Connection } from 'jsstore'
import JsStoreWorker from 'jsstore/dist/jsstore.worker.min.js?worker'

// Import all database table schemas
import tables from './tables/index'

// middlewares
import { cypherMiddleware } from '@/service/middleware/cypherMiddleware'

// Create Connection
const createConnection = () => new Connection(new JsStoreWorker())
export let idbCon = createConnection()

/**
 * dbVersion is the latest version of the Greenery Database
 * Increment dbVersion with each database migration
 * JsStore Docs for updating database schema: https://jsstore.net/docs/update-schema/
 */

export const dbVersion = 12

/**
 * @function initJsStore Begins the database configuration process
 */
export const initJsStore = async () => {
  try {
    const currentDbVersion = await getCurrentDbVersion()
    const isLatest = currentDbVersion === dbVersion

    // Error if database version is higher than expected.
    if (currentDbVersion > dbVersion)
      throw new Error(
        'Existing database version is higher than expected. Database must be rebuilt.'
      )

    // Determine whether to create/load or update the database
    if (!currentDbVersion || isLatest) {
      await initDatabase()
    } else performDatabaseUpdate(currentDbVersion)
  } catch (err) {
    console.error(err.message)
  }
}

const initDatabase = async (version) => {
  await idbCon.initDb(getDatabase(version))
  idbCon.addMiddleware(cypherMiddleware)
}

/**
 * Any modifications to data during a database migration should be added to this function
 *
 * @function performDatabaseUpdate Performs database migrations in increments of 1
 * @param {Number} previousVersion Version of database to update from
 */
const performDatabaseUpdate = async (previousVersion) => {
  const updateVersion = previousVersion + 1
  await initDatabase(updateVersion)

  // Version 3 modifies all existing user emails to lowercase
  if (updateVersion === 3) {
    let accounts = await idbCon.select({ from: 'users' })
    accounts = accounts.map((account) => {
      account.email = account.email.toLowerCase()
      return account
    })
    await idbCon.insert({
      into: 'users',
      upsert: true,
      values: accounts
    })
  }

  // Version 6 - Set all existing contacts type to 'regular'
  else if (updateVersion === 6) {
    let contacts = await idbCon.select({ from: 'contacts' })
    contacts = contacts.map((contact) => {
      contact.type = 'regular'
      return contact
    })
    await idbCon.insert({
      into: 'contacts',
      upsert: true,
      values: contacts
    })
  }

  // Version 8 - Remove data from transactions table so that data is updated with network
  else if (updateVersion === 8) {
    await idbCon.clear('transactions')
  }

  // Version 9 - Remove data from transactions table to force update ETH tokens
  else if (updateVersion === 9) {
    await idbCon.clear('transactions')
  }

  // Version 10 - Add default mfaOnWeb3Requests to existing accounts
  else if (updateVersion === 10) {
    let userSettings = await idbCon.select({ from: 'userSettings' })
    userSettings = userSettings.map((settings) => {
      settings.mfaRequireOnWeb3Requests = false
      return settings
    })
    await idbCon.insert({
      bypassCypherMiddleware: true,
      into: 'userSettings',
      upsert: true,
      values: userSettings
    })
  }

  // DATABASE ALTERS TO BE INCLUDED ABOVE THIS LINE

  // Repeat if updateVersion is not latest
  if (updateVersion !== dbVersion) {
    await idbCon.terminate()
    idbCon = await createConnection()
    performDatabaseUpdate(updateVersion)
  }
}

/**
 * @returns Version number of database user is currently configured with.
 *
 * Api getDbList is recommended to use for debugging only. Do not use in code.
 * May need to find workaround if issues arise.
 */
const getCurrentDbVersion = async () => {
  const dbList = await idbCon.getDbList()
  const currentDatabase = dbList.find((db) => {
    return db.name === getDatabase().name
  })

  if (!currentDatabase) return
  return currentDatabase.version
}

const getDatabase = (version = dbVersion) => {
  const dataBase = {
    name: 'Greenery',
    version,
    tables: [
      tables.tblUsers,
      tables.tblTransactions,
      tables.tblInvoices,
      tables.tblContacts,
      tables.tblContactAddresses,
      tables.tblExchangeContacts,
      tables.tblActivityHistory,
      tables.tblWallets,
      tables.tblPaperWallets,
      tables.tblHistory,
      tables.tblUserSettings,
      tables.tblPWImportHistory,
      tables.tblErrors,
      tables.tblWeb3Connections,
      tables.tblMnemonicPasswords,
      tables.tblQuickExchageHistory
    ]
  }
  return dataBase
}
