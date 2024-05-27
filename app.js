//Importazione dei Moduli
const express = require('express');
const app = express();
const port = 9015;

//Importazione del Controller
const routePosts = require('./Controller/posts');

//Definizione delle rotte
app.get('/', (req, res) => {
  res.send(
    `<h1>Benvenuto nel mio Blog! Qui potrai trovare tutte le news sulla tua squadra del cuore l'ACMILAN!</h1>`
  );
});

app.get('/posts', routePosts);

//Avvio server
app.listen(port, () => {
  console.log(`Server http://localhost:${port}`);
});
