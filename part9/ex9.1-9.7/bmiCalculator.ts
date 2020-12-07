interface Values {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 15) return 'Very severely underweight';
  if (bmi < 16) return 'Severely underweight';
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal (healthy weight)';
  if (bmi < 30) return 'Overweight';
  if (bmi < 35) return 'Obese Class I (Moderately obese)';
  if (bmi < 40) return 'Obese Class II (Severely obese)';
  return 'Obese Class III (Very severely obese)';
};

const parseArguments = (args: string[]): Values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (isNaN(Number(args[2])) && isNaN(Number(args[3])))
    throw new Error('Provided values were not numbers!');

  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  if (e instanceof Error) {
    console.log('Error message:', e.message);
  } else {
    console.log('Something went wrong');
  }
}
