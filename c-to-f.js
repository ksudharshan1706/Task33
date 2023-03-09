const fare = (C) => {
  return C * (9 / 5) + 32;
};

const [, , Celcius] = process.argv;
console.log(fare(Celcius));
