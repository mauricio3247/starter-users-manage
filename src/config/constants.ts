const constantes = {
  APP: {
    PORT: process.env.PORT || '3000'
  },
  SECURE: {
    JT_PASS: process.env.JT_PASS,
    BCRYPT_SALTS: process.env.BCRYPT_SALTS,
    ADM_USERNAME: process.env.ADM_USERNAME,
    ADM_PASSWORD: process.env.ADM_PASSWORD,
  },
  DB: {
    MONGO_URI: process.env.MONGO_URI
  }
}

export default constantes;