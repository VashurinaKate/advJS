const str = "'I'll start learning French soon,' said Steven"
const regexp = /(\B')|('\B)/g;
console.log(str.replace(regexp, '"'));
