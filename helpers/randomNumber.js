const random = (from, to, isAddingZero = false) => {
  const randomNumber = Math.floor(Math.random() * (to - from + 1) + from);

  if (randomNumber < 10 && isAddingZero) {
    return `0${randomNumber}`;
  } else {
    return `${randomNumber}`;
  }
};

module.exports = random;
