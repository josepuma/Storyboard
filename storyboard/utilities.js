export function getRandom(min, max){
    let rand = Math.random()*(max-min) + min;
    let power = Math.pow(10, 2);
    return Math.floor(rand*power) / power;
}
