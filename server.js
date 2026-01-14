import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the dist folder (built React app)
app.use(express.static(path.join(__dirname, 'dist')));

// Serve favicon from public folder if it exists
app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'favicon.ico')));

// Handle client-side routing - serve index.html for all non-file requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🏥 OnboardHealth MSO - AI Implementation Platform           ║
║                                                               ║
║   Server running at http://localhost:${PORT}                    ║
║                                                               ║
║   Features:                                                   ║
║   ✨ AI Delay Prediction                                      ║
║   ✨ Smart Task Generator                                     ║
║   ✨ Practice Manager Chatbot                                 ║
║   ✨ Smart Escalation Intelligence                            ║
║   ✨ Compliance Document Analyzer                             ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);
});
