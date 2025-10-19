import { DATA_TYPE } from 'jsstore'

export default {
  name: 'paperWallets',
  columns: {
    id: {
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      notNull: true,
      dataType: DATA_TYPE.Number
    },
    serial: {
      dataType: DATA_TYPE.String,
      notNull: true
    },
    date: {
      dataType: DATA_TYPE.DateTime,
      notNull: true
    },
    paperWalletType: {
      dataType: DATA_TYPE.String,
      notNull: true
    },
    coinTicker: {
      dataType: DATA_TYPE.String,
      notNull: true
    },
    amount: {
      dataType: DATA_TYPE.Number,
      notNull: true
    },
    note: {
      dataType: DATA_TYPE.String,
      notNull: true
    },
    recipient: {
      dataType: DATA_TYPE.String,
      notNull: false
    },
    holdPeriod: {
      dataType: DATA_TYPE.Number,
      notNull: false
    },
    publicAddress: {
      dataType: DATA_TYPE.String,
      notNull: false
    },
    privateKey: {
      dataType: DATA_TYPE.String,
      notNull: false
    },
    activityCategory: {
      dataType: DATA_TYPE.String,
      notNull: true
    }
  }
}
