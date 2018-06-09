module.exports = app => {
    app.get('/tasks', (req, res) => {
        res.json({
            tasks: [
                {name: 'Fazer compras'},
                {name: 'Trocar a resistência do chuveiro'},
                {name: 'Almoçar'}
            ]
        });
    });
};