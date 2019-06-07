
module.exports = function config(){

    return {
        name: 'MMO',

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