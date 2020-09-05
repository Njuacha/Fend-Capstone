function isInputEmpty(input) {
  return input.trim() == ""? true: false;
}

function isInputNull(input) {
  return input == null? true: false;
}

function isDateEarlierThanToday(date) {
  let today = new Date();
  return date.getDate() < today.getDate();
}

export {
  isInputEmpty,
  isInputNull,
  isDateEarlierThanToday
}
