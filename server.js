import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Check if dist folder exists
const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

if (!fs.existsSync(distPath)) {
  console.error('ERROR: dist folder not found. Run "npm run build" first.');
}

if (!fs.existsSync(indexPath)) {
  console.error('ERROR: dist/index.html not found. Run "npm run build" first.');
}

// Serve static files from the dist folder (built React app)
app.use(express.static(distPath));

// Handle client-side routing - serve index.html for all non-file requests
app.get('*', (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send(`
      <h1>Build Required</h1>
      <p>The React app has not been built yet.</p>
      <p>Run: <code>npm run build</code></p>
    `);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🏥 OnboardHealth MSO - AI Implementation Platform           ║
║                                                               ║
║   Server running at http://localhost:${PORT}                    ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);
});
