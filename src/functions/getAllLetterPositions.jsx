export const getAllLetterPositions = (string = "", letter = '') => {
    let str = string.toLowerCase();
    let l = letter.toLowerCase();
    let arr = [], position = 0;

    while(position < str.length && str.indexOf(l, position) != -1){
        position = str.indexOf(l, position);
        arr.push(position);
        position++;
    }
    console.log(arr)
    return arr;
}   