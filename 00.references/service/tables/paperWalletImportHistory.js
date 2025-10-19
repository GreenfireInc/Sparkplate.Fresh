import { DATA_TYPE } from 'jsstore'

export default {
  name: 'pwImportHistory',
  columns: {
    id: {
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      dataType: DATA_TYPE.Number,
      notNull: true
    },
    type: {
      dataType: DATA_TYPE.String,
      notNull: true
    },
    date: {
      dataType: DATA_TYPE.DateTime,
      notNull: true
    },
    issueDate: {
      dataType: DATA_TYPE.DateTime
    },
    amount: {
      dataType: DATA_TYPE.Number,
      notNull: true
    },
    fiatEquiv: {
      dataType: DATA_TYPE.Number
    },
    walletId: {
      dataType: DATA_TYPE.Number,
      notNull: true
    },
    senderFirstName: {
      dataType: DATA_TYPE.String
    },
    senderLastName: {
      dataType: DATA_TYPE.String
    },
    senderEmail: {
      dataType: DATA_TYPE.String
    },
    note: {
      dataType: DATA_TYPE.String,
      notNull: true
    }
  }
}
