const next = require('next');
const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    // Serve static files from .next
    server.use(express.static(path.join(__dirname, '.next')));

    // Handle all routes through Next.js
    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('❌ Error starting server:', err);
    process.exit(1);
  });