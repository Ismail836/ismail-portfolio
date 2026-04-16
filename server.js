const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
const projectDataPath = path.join(__dirname, 'public', 'projects.json');
const clickLogPath = path.join(__dirname, 'clicks.log');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const analytics = (req, res, next) => {
  if (req.path === '/api/projects') {
    logClick('projects_endpoint');
  }
  next();
};

app.use(analytics);

app.get('/api/projects', (req, res) => {
  fs.readFile(projectDataPath, 'utf8', (error, raw) => {
    if (error) {
      console.error('Unable to read project data:', error);
      return res.status(500).json({ error: 'Unable to load projects.' });
    }
    res.json(JSON.parse(raw));
  });
});

app.post('/api/project-click', (req, res) => {
  const { slug } = req.body;
  if (!slug) {
    return res.status(400).json({ error: 'Project slug is required.' });
  }
  logClick(slug);
  res.json({ success: true });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: `Portfolio Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Message sent.' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Unable to send message. Please try again later.' });
  }
});

app.get('/api/analytics', (req, res) => {
  fs.readFile(clickLogPath, 'utf8', (err, data) => {
    if (err) {
      return res.json({ analytics: {} });
    }
    const parsed = data
      .trim()
      .split('\n')
      .filter(Boolean)
      .reduce((acc, line) => {
        const [key, count] = line.split(',');
        acc[key] = Number(count);
        return acc;
      }, {});
    res.json({ analytics: parsed });
  });
});

function logClick(key) {
  const safeKey = String(key).replace(/[^a-zA-Z0-9_-]/g, '_');
  const current = readClicks();
  current[safeKey] = (current[safeKey] || 0) + 1;
  const csv = Object.entries(current).map(([name, count]) => `${name},${count}`).join('\n');
  fs.writeFile(clickLogPath, csv, (err) => {
    if (err) {
      console.error('Could not log click:', err);
    }
  });
}

function readClicks() {
  if (!fs.existsSync(clickLogPath)) {
    return {};
  }
  const content = fs.readFileSync(clickLogPath, 'utf8');
  return content
    .trim()
    .split('\n')
    .filter(Boolean)
    .reduce((acc, line) => {
      const [key, count] = line.split(',');
      acc[key] = Number(count);
      return acc;
    }, {});
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio server listening on http://localhost:${PORT}`);
});
