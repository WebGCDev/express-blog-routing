// Importa l'array dei post dal file 'postsDb.json'
const posts = require('../db/postsDb.json');
//Gestione dei percorsi
const path = require('path');

const index = (req, res) => {
  //stringa HTML che conterrà una lista di post
  let html = '<ul>';
  // Iteriamo attraverso ogni post nel file JSON
  posts.forEach((post) => {
    //Per ogni post, aggiungiamo un elemento <li> con un link al post specifico, usando il suo slug
    html += `<li><a href="/posts/${post.slug}">${post.title}</a></li>`;
  });
  //Chiusura Html
  html += '</ul>';
  //Inviamo risposta con contenuto dell'HTML
  res.send(html);
};
//Funzione per gestire la richiesta per visualizzare un singolo post
const show = (req, res) => {
  // post nel file JSON che corrisponde allo slug passato come parametro nella richiesta
  const post = posts.find((p) => p.slug === req.params.slug);
  if (post) {
    const imageUrl = `${req.protocol}://${req.get('host')}/${post.image}`;
    console.log('Image URL:', imageUrl);
    let html = '<div>';
    //Variabile per contenere HTML
    html += `<div>
            <img src="/${post.image}" alt="${post.title}">
            <div class="post-content">
              <h2>${post.title}</h2>
              <p>${post.content}</p>
               <p><strong>IMAGE URL:</strong> <a href="${imageUrl}" target="_blank">${imageUrl}</a></p>
            </div>
`;
    html += '</div>';
    //Inviamo risposta con contenuto dell'HTML
    res.send(html);
  } else {
    //rispondiamo con un errore 404 e un messaggio JSON
    res.status(404).json({ error: 'Post not found' });
  }
};

// Funzione per gestire la richiesta per creare un nuovo post
const create = (req, res) => {
  // Formattiamo la risposta in base al tipo di richiesta accettata
  res.format({
    html: () => {
      // Se tipo di richiesta accetta HTML, inviamo una pagina HTML con un messaggio
      res.send('<h1>Qui potrai creare i tuoi post</h1>');
    },
    default: () => {
      // Se il tipo di richiesta non è accettato, inviamo un errore 406 (Not Acceptable)
      res.status(406).send('Not Acceptable');
    },
  });
};

// download immagine del post
const downloadImage = (req, res) => {
  // Decodifica lo slug
  const slug = decodeURIComponent(req.params.slug);
  // Cerca il post nel file JSON che corrisponde allo slug decodificato
  const post = posts.find((p) => p.slug === slug);
  //Quando il post viene trovato
  if (post) {
    // restituisce il percorso completo dell'immagine
    const imagePath = path.join(__dirname, '../public', post.image);
    res.download(imagePath, (err) => {
      if (err) {
        // Log errore 500
        res.status(500).json({ error: "Errore nel download dell'immagine" });
      }
    });
    //post non viene trovato errore 500
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
};

// Le funzioni devono essere esportate per renderle disponibili in altre parti dell'app
module.exports = { index, show, create, downloadImage };
