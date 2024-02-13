import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

let requestCount = 0;
let lastResetTime = Date.now();

const MAX_REQUESTS_PER_SECOND = 50;
const REQUESTS_RESET_INTERVAL = 1000;

app.get('/api', (req: Request, res: Response) => {
  const currentTime = Date.now();
  if (currentTime - lastResetTime >= REQUESTS_RESET_INTERVAL) {
    requestCount = 0;
    lastResetTime = currentTime;
  }
  if (requestCount >= MAX_REQUESTS_PER_SECOND) {
    res.status(429).send('Too Many Requests');
    return;
  }
  requestCount++;

  const delay = Math.floor(Math.random() * 1000) + 1;
  setTimeout(() => {
    const requestIndex = req.query.index;
    console.log('Received request with index:', requestIndex);
    res.send(`Response for request index ${requestIndex}`);
  }, delay);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
