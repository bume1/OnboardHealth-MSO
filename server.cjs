const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Get absolute paths
const distPath = path.resolve(__dirname, 'dist');
const indexPath = path.resolve(distPath, 'index.html');

console.log('=== Server Starting ===');
console.log('__dirname:', __dirname);
console.log('process.cwd():', process.cwd());
console.log('distPath:', distPath);
console.log('indexPath:', indexPath);
console.log('Dist exists:', fs.existsSync(distPath));
console.log('Index exists:', fs.existsSync(indexPath));

if (fs.existsSync(distPath)) {
  console.log('Dist contents:', fs.readdirSync(distPath));
  if (fs.existsSync(path.join(distPath, 'assets'))) {
    console.log('Assets contents:', fs.readdirSync(path.join(distPath, 'assets')));
  }
} else {
  console.log('WARNING: dist folder not found!');
  // Try to find where we are
  console.log('Current directory contents:', fs.readdirSync(__dirname));
}

app.use(cors());
app.use(express.json());

// Serve static files from the dist folder
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    maxAge: '1d',
    etag: true
  }));
  console.log('Static middleware configured for:', distPath);
}

// Handle all routes - serve index.html for SPA
app.get('*', (req, res) => {
  console.log('Request for:', req.path);

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error loading application');
      }
    });
  } else {
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Build Required</title></head>
        <body>
          <h1>Build Required</h1>
          <p>The application has not been built yet.</p>
          <p>Expected dist folder at: <code>${distPath}</code></p>
          <p>Current directory: <code>${__dirname}</code></p>
          <p>Run: <code>npm run build</code></p>
        </body>
      </html>
    `);
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(500).send('Server error: ' + err.message);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('=== Server Ready ===');
  console.log(`Server running at http://localhost:${PORT}`);
});
