function rotateArray(array){
  let newArray = [];
  for (let i = 0; i < array[0].length; i++){
    newArray[i] = [];
    for(let j = 0; j < array.length; j++){
      newArray[i][array.length - j - 1] = array[j][i];
    }
  }
  return newArray;
}
