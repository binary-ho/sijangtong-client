const color = [
    'lightcoral',
    'lightgray',
    'lightgreen',
    'lightgrey',
    'lightpink',
    'lightsalmon',
    'lightseagreen',
]
export const generateColor = () => {
    return color[Math.floor(Math.random()*color.length)];
}