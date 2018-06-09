module.exports = app => {
 let porta = app.get('port');
 app.listen(porta, () => console.log(`Bootcamp API - Server running in port ${porta}`));
};