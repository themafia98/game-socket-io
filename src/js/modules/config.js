
export default function config(width = screen.width,height = screen.height){

    let minus = !(screen.width < 450) ? ~~((20 * width) / 100) : 0;

    return {
        name: 'MMO',
        width: width,
        height: height - minus,
        version: '1.2.2',
        map: {
            width: 3200,
            height: 3200,
            limit: [3100, 3050],
        },
        AXIS: {
            BOTH: 'both',
            VERTICAL: 'vertical',
            HORIZONTAL: 'horizontal',
        },
    };
};