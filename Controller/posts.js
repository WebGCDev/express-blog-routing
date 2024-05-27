const posts = require('../postsDb'); // Importa l'array dei post dal file 'postsDb'

const routePosts = (req, res) => {
  res.format({
    html: () => {
      let html = `
        <!DOCTYPE html>
        <html lang="it">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Tutti i posts</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .post {
              background-color: #fff;
              margin-bottom: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .post img {
              width: 100%;
              height: auto;
              display: block;
            }
            .post-content {
              padding: 20px;
            }
            .tags {
              list-style: none;
              padding: 0;
              margin: 10px 0 0;
              text-align: center;
            }
            .tags li {
              display: inline-block;
              margin-right: 10px;
              background-color: #f2f2f2;
              padding: 5px 10px;
              border-radius: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 style='text-align: center;'>Tutti i posts</h1>`;

      posts.forEach((post) => {
        let tagHtml = '';
        post.tags.forEach((tag) => {
          tagHtml += `<li>${tag}</li>`;
        });

        html += `
          <div class="post">
            <img src="${post.image}" alt="${post.title}">
            <div class="post-content">
              <h2>${post.title}</h2>
              <p>${post.content}</p>
              <ul class="tags">
                ${tagHtml}
              </ul>
            </div>
          </div>`;
      });

      html += `
          </div>
        </body>
        </html>`;

      res.send(html); // Invio della risposta HTML al client
    },
    json: () => {
      res.json(posts); // Invio della risposta JSON al client
    },
  });
};

module.exports = routePosts;
