import { DATA_TYPE } from 'jsstore'

export default {
  name: 'exchangeContacts',
  columns: {
    id: {
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      notNull: true,
      dataType: DATA_TYPE.String
    },
    referralCode: {
      dataType: DATA_TYPE.String
    },
    currency: {
      notNull: true,
      dataType: DATA_TYPE.String
    },
    address: {
      notNull: true,
      dataType: DATA_TYPE.String
    }
  }
}
