
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');


const app = express();
app.use(cors());

let lifestyleData = [];

fs.createReadStream(path.join(__dirname,'Final_data.csv'))
  .pipe(csv())
  .on('data', (row) => {
    lifestyleData.push(row);
  })
  .on('end', () => {
    console.log('CSV carregado com sucesso!');
  });

app.get('/api/lifestyle', (req, res) => {
  res.json(lifestyleData);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
