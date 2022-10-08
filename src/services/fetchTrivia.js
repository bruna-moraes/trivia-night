const fetchTrivia = async (token) => {
  const ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;

  const response = await fetch(ENDPOINT);
  const { results } = await response.json();
  return results;
};

export default fetchTrivia;
