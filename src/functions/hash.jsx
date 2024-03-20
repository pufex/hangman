export const hash = (word = "") => {
    let arr = [];
    let whitespace = new Set(" ", "\t", "\n");
    for(let i = 0; i < word.length; i++){
        if(!whitespace.has(word[i]))
           arr.push("#");
        else{
            arr.push(word[i])
        } 
    }
    return arr.join("");
}