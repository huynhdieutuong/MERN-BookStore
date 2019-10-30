module.exports = string => {
  let words = string.trim().split(' ');
  words = words.map(word => {
    const newWord = word.slice(0, 1).toUpperCase() + word.slice(1);
    return newWord;
  });
  return words.join(' ');
};
