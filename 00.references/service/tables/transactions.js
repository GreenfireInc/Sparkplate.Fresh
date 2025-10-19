import { DATA_TYPE } from 'jsstore'

export default {
  name: 'transactions',
  columns: {
    id: {
      primaryKey: true,
      autoIncrement: true
    },
    uniqueId: {
      // each transaction has a unique id and this stops duplicate transactions from being recorded in the db
      dataType: DATA_TYPE.String,
      unique: true
    },
    source: {
      dataType: DATA_TYPE.String
    },
    sourceName: {
      dataType: DATA_TYPE.String
    },
    destination: {
      dataType: DATA_TYPE.String
    },
    amount: {
      dataType: DATA_TYPE.Number,
      notNull: false
    },
    txType: {
      dataType: DATA_TYPE.String,
      notNull: true
    },
    txClassType: {
      dataType: DATA_TYPE.String,
      notNull: false
    },
    date: {
      dataType: DATA_TYPE.DateTime,
      notNull: true
    },
    note: {
      dataType: DATA_TYPE.String,
      notNull: false
    },
    userId: {
      dataType: DATA_TYPE.Number,
      notNull: true
    },
    coinTicker: {
      dataType: DATA_TYPE.String
    },
    transactionId: {
      dataType: DATA_TYPE.String,
      notNull: true
    },
    expanded: {
      dataType: DATA_TYPE.Boolean,
      notNull: true,
      default: false
    },
    runningBalance: {
      dataType: DATA_TYPE.String
    },
    runningBalanceValue: {
      dataType: DATA_TYPE.String
    },
    fees: {
      dataType: DATA_TYPE.Number
    },
    activityCategory: {
      dataType: DATA_TYPE.String,
      notNull: true
    },
    network: {
      dataType: DATA_TYPE.String
    }
  },
  alter: {
    8: {
      add: {
        network: {
          dataType: DATA_TYPE.String
        }
      },
      drop: {
        explorerURL: {}
      },
      modify: {
        amount: {
          notNull: false
        }
      }
    }
  }
}
