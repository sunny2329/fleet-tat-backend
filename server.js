const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routeAnalyticsRouter = require('./routeAnalytics');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'Fleet TAT API is running' });
});

app.use('/api/routes', routeAnalyticsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Fleet TAT backend running on http://localhost:${PORT}`);
});
