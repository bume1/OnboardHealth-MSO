const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const SERVER_VERSION = 'v2.0.1-debug';
const app = express();
const PORT = process.env.PORT || 3000;

// Get absolute paths
const distPath = path.resolve(__dirname, 'dist');
const indexPath = path.resolve(distPath, 'index.html');

console.log('');
console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║  OnboardHealth MSO Demo Server ' + SERVER_VERSION + '              ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('');
console.log('__dirname:', __dirname);
console.log('process.cwd():', process.cwd());
console.log('PORT:', PORT);
console.log('distPath:', distPath);
console.log('indexPath:', indexPath);
console.log('');

// Check what files exist
console.log('=== File System Check ===');
console.log('Dist folder exists:', fs.existsSync(distPath));
console.log('Index.html exists:', fs.existsSync(indexPath));

if (fs.existsSync(distPath)) {
  const distContents = fs.readdirSync(distPath);
  console.log('Dist contents:', distContents);

  const assetsPath = path.join(distPath, 'assets');
  if (fs.existsSync(assetsPath)) {
    console.log('Assets contents:', fs.readdirSync(assetsPath));
  }
} else {
  console.log('');
  console.log('!!! WARNING: dist folder NOT FOUND !!!');
  console.log('');
  console.log('Root directory contents:', fs.readdirSync(__dirname));
}
console.log('');

app.use(cors());
app.use(express.json());

// HEALTH CHECK - This should always work
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    version: SERVER_VERSION,
    distExists: fs.existsSync(distPath),
    indexExists: fs.existsSync(indexPath),
    dirname: __dirname,
    cwd: process.cwd()
  });
});

// TEST ROUTE - Returns simple HTML
app.get('/test', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Server Test Page</h1>
        <p>Server Version: ${SERVER_VERSION}</p>
        <p>Dist exists: ${fs.existsSync(distPath)}</p>
        <p>Index exists: ${fs.existsSync(indexPath)}</p>
        <p>__dirname: ${__dirname}</p>
        <p><a href="/">Go to App</a></p>
      </body>
    </html>
  `);
});

// Serve static files from dist if it exists
if (fs.existsSync(distPath)) {
  console.log('Setting up static file serving from:', distPath);
  app.use(express.static(distPath));
}

// Handle all other routes - serve index.html for SPA routing
app.get('*', (req, res) => {
  console.log('[REQUEST]', req.method, req.path);

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // Show detailed error page
    res.status(404).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>OnboardHealth - Setup Required</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
            code { background: #f1f1f1; padding: 2px 6px; border-radius: 3px; }
            .error { color: #e53e3e; }
            .info { color: #3182ce; }
          </style>
        </head>
        <body>
          <h1>OnboardHealth MSO Demo</h1>
          <h2 class="error">Build Required</h2>
          <p>The React application has not been built yet.</p>
          <h3>Debug Information:</h3>
          <ul>
            <li>Server Version: <code>${SERVER_VERSION}</code></li>
            <li>Expected dist at: <code>${distPath}</code></li>
            <li>Dist exists: <code class="${fs.existsSync(distPath) ? 'info' : 'error'}">${fs.existsSync(distPath)}</code></li>
            <li>Index exists: <code class="${fs.existsSync(indexPath) ? 'info' : 'error'}">${fs.existsSync(indexPath)}</code></li>
            <li>Working directory: <code>${process.cwd()}</code></li>
            <li>Server directory: <code>${__dirname}</code></li>
          </ul>
          <h3>To fix:</h3>
          <p>Run: <code>npm run build</code></p>
          <hr>
          <p><a href="/test">Test Page</a> | <a href="/health">Health Check (JSON)</a></p>
        </body>
      </html>
    `);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('=== Server Ready ===');
  console.log(`Listening on http://0.0.0.0:${PORT}`);
  console.log('');
  console.log('Test URLs:');
  console.log(`  http://localhost:${PORT}/health`);
  console.log(`  http://localhost:${PORT}/test`);
  console.log('');
});
