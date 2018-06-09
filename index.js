const express = require('express');
const port = 3000;

const app = express();

app.get('/', (req, res) => {
   res.json({ status: 'Bootcamp API OK!' });
});

app.get('/tasks', (req, res) => {
   res.json({
       tasks: [
        {name: 'Fazer compras'},
        {name: 'Trocar a resistência do chuveiro'},
        {name: 'Almoçar'}
       ]
   });
});

app.listen(port, () => console.log(`Server running in port ${port}`));
