import { DATA_TYPE } from 'jsstore'

const tblQuickExchageHistory = {
  name: 'quickExchangeHistory',
  columns: {
    id: {
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      dataType: DATA_TYPE.DateTime,
      notNull: true
    },
    quickExchangeId: {
      notNull: true,
      dataType: DATA_TYPE.String
    },
    quickExchangeName: {
      notNull: true,
      dataType: DATA_TYPE.String
    },
    userId: {
      notNull: true,
      dataType: DATA_TYPE.Number
    }
  }
}

export default tblQuickExchageHistory
