const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Check if dist folder exists
const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

console.log('Looking for dist at:', distPath);
console.log('Dist exists:', fs.existsSync(distPath));
console.log('Index exists:', fs.existsSync(indexPath));

if (fs.existsSync(distPath)) {
  console.log('Dist contents:', fs.readdirSync(distPath));
}

// Serve static files from the dist folder
app.use(express.static(distPath));

// Handle client-side routing
app.get('*', (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send(`
      <h1>Build Required</h1>
      <p>The dist folder was not found at: ${distPath}</p>
      <p>Run: <code>npm run build</code></p>
    `);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
