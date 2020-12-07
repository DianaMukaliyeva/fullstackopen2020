interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (daily: number[], target: number): Result => {
  const average = daily.reduce((a, b) => a + b) / daily.length;
  let rating = 3;

  if (target - average < 1 && target - average > 0) {
    rating = 2;
  } else if (target - average >= 1) {
    rating = 1;
  }

  let ratingDescription = 'good job! keep going!';

  if (rating === 2) {
    ratingDescription = 'not too bad but could be better';
  } else if (rating === 1) {
    ratingDescription = 'try better next time';
  }

  return {
    periodLength: daily.length,
    trainingDays: daily.filter((n) => n !== 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
