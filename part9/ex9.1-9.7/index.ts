import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    res.status(400).json({ error: 'parameters missing' });
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

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as {
    daily_exercises: number[];
    target: number;
  };

  if (!daily_exercises || !target || daily_exercises.length === 0) {
    res.status(400).json({ error: 'parameters missing' });
  } else {
    if (isNaN(target) || daily_exercises.filter((num) => isNaN(num)).length > 0) {
      res.status(400).json({ error: 'malformatted parameters' });
    } else {
      res.json(calculateExercises(daily_exercises, target));
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
