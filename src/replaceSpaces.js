function replaceSpaces(card_name){
  card_name=card_name.replace(/ /g,"+");
  return card_name;
}

module.exports = replaceSpaces;