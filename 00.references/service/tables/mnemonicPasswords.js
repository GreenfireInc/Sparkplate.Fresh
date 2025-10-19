import { DATA_TYPE } from 'jsstore'

export default {
  name: 'mnemonicPasswords',
  columns: {
    id: {
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      dataType: DATA_TYPE.Number,
      notNull: true
    },
    mpProperty: {
      datatype: DATA_TYPE.String,
      notNull: true
    },
    mpType: {
      datatype: DATA_TYPE.String,
      notNull: true
    },
    mpNote: {
      datatype: DATA_TYPE.String,
      notNull: false
    },
    mpInitialDate: {
      datatype: DATA_TYPE.DateTime,
      notNull: true
    },
    mpCurrency: {
      datatype: DATA_TYPE.String,
      notNull: true
    },
    mpDerivationPathDepth: {
      datatype: DATA_TYPE.Number,
      notNull: true
    },
    mpAddress: {
      datatype: DATA_TYPE.String,
      notNull: true
    },
    mpPublicKey: {
      datatype: DATA_TYPE.String,
      notNull: true
    },
    mpPrivateKey: {
      datatype: DATA_TYPE.String,
      notNull: true
    }
  }
}
