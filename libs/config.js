module.exports = {
  database: 'bootcamp',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: 'bootcamp.sqlite',
    define: {
      underscored: true
    }
  },
  jwtSecret: 'NRCLJA1TO9',
  jwtSession: {
    session: false
  }
};