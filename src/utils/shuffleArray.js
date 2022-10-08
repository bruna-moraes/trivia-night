// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

function shuffleArray(array) {
  const newArray = [...array];

  for (let index = newArray.length - 1; index > 0; index -= 1) {
    const index2 = Math.floor(Math.random() * (index + 1));
    const temp = newArray[index];
    newArray[index] = newArray[index2];
    newArray[index2] = temp;
  }
  return newArray;
}

export default shuffleArray;
