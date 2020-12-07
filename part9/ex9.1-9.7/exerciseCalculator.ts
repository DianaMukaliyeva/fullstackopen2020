interface ParsedValues {
  daily: number[];
  target: number;
}

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

const parseArgumentsIntoArray = (args: string[]): ParsedValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const dailyHours = [];

  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    }
    if (i !== 2) dailyHours.push(Number(args[i]));
  }

  return {
    daily: dailyHours,
    target: Number(args[2]),
  };
};

try {
  const { daily, target } = parseArgumentsIntoArray(process.argv);
  console.log(calculateExercises(daily, target));
} catch (e) {
  if (e instanceof Error) {
    console.log('Error message:', e.message);
  } else {
    console.log('Something went wrong');
  }
}
