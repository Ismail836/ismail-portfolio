const express = require('express');
const fs = require('fs');
const nodemailer = require('nodemailer');
const { PROJECTS, CLICKS } = require('../config');
const { logClick, readClicks } = require('../lib/clicks');

const router = express.Router();

router.get('/projects', (req, res) => {
  logClick('projects_endpoint');
  fs.readFile(PROJECTS, 'utf8', (error, raw) => {
    if (error) {
      console.error('Unable to read project data:', error);
      return res.status(500).json({ error: 'Unable to load projects.' });
    }
    try {
      const data = JSON.parse(raw || '[]');
      res.json(data);
    } catch (err) {
      console.error('Malformed projects.json:', err);
      return res.status(500).json({ error: 'Unable to load projects.' });
    }
  });
});

router.post('/project-click', (req, res) => {
  const { slug } = req.body;
  if (!slug) {
    return res.status(400).json({ error: 'Project slug is required.' });
  }
  logClick(slug);
  res.json({ success: true });
});

router.post('/contact', async (req, res) => {
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

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
    });
    res.json({ success: true, message: 'Message sent.' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Unable to send message. Please try again later.' });
  }
});

router.get('/analytics', (req, res) => {
  fs.readFile(CLICKS, 'utf8', (err) => {
    if (err) return res.json({ analytics: {} });
    res.json({ analytics: readClicks() });
  });
});

module.exports = router;
