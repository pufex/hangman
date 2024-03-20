export const generateAlphabet = () => {
    return [...Array(26)].map((_, i) => String.fromCharCode(i + 97)); 
}