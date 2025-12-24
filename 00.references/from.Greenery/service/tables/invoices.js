import { DATA_TYPE } from 'jsstore'

export default {
  name: 'invoices',
  columns: {
    id: {
      primaryKey: true,
      autoIncrement: true
    },
    orderId: {
      notNull: true,
      dataType: DATA_TYPE.Number
    },
    invoiceType: {
      notNull: true,
      dataType: DATA_TYPE.String
    },
    walletId: {
      dataType: DATA_TYPE.Number,
      notNull: false
    },
    coinTicker: {
      dataType: DATA_TYPE.String,
      notNull: true
    },
    publicAddress: {
      notNull: true,
      dataType: DATA_TYPE.String
    },
    recipientId: {
      dataType: DATA_TYPE.Number,
      notNull: false
    },
    recipientName: {
      dataType: DATA_TYPE.String,
      notNull: true
    },
    recipientEmail: {
      dataType: DATA_TYPE.String,
      notNull: true
    },
    recipientCompany: {
      dataType: DATA_TYPE.String,
      notNull: false
    },
    date: {
      dataType: DATA_TYPE.DateTime,
      notNull: true
    },
    orders: {
      dataType: DATA_TYPE.Array,
      notNull: true
    },
    userId: {
      dataType: DATA_TYPE.Number,
      notNull: true
    },
    activityCategory: {
      dataType: DATA_TYPE.String,
      notNull: true
    }
  }
}
