import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    res.status(400).json({ error: 'malformatted parameters' });
  } else {
    const heightNum = Number(height);
    const weightNum = Number(weight);

    if (isNaN(heightNum) || isNaN(weightNum)) {
      res.status(400).json({ error: 'malformatted parameters' });
    }
    res.json({
      weight: weightNum,
      height: heightNum,
      bmi: calculateBmi(heightNum, weightNum),
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
