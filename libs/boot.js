module.exports = app => {
  let porta = app.get('port');

  //force true não utilizar em produção
  app.db.sequelize.sync({force: true}).done( () => {
    app.listen(porta, () => console.log(`Bootcamp API - Server running in port ${porta}`));
  })
};