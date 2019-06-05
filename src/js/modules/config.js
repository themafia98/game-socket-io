
export default function config(width = screen.width,height = screen.height){

    let minus = !(screen.width < 450) ? ~~((30 * width) / 100) : 0;

    return {
        name: 'MMO',
        width: width-minus,
        height: height-minus,
        version: '0.7.1',
        map: {
            width: 3200,
            height: 3200,
            limit: [3200 - 750, 3200 - 450],
        },
        AXIS: {
            BOTH: 'both',
            VERTICAL: 'vertical',
            HORIZONTAL: 'horizontal',
        },
        loop: {
            FPS: 30,
            INTERVAL: 1000/30, // miliseconds
            STEP: (1000/30)/1000 // seconds
        }
    }
}