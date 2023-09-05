function getRandomString(length: number) {
  return Math.random().toString(36).substring(2, 2 + length);
}

export const createRandonString = () => {
  const randomNumber = Math.floor(Math.random() * (10 - 1 + 1)) + 1
  return getRandomString(randomNumber)
}
