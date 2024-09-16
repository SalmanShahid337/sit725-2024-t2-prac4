const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sit725', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define schema
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now },
});

const Project = mongoose.model('Project', ProjectSchema);

// API routes
app.post('/projects', async (req, res) => {
  const { title, description } = req.body;
  const project = new Project({ title, description });
  await project.save();
  res.send('Project saved successfully!');
});

app.get('/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
