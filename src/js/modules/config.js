
export default function config(width = screen.width,height = screen.height){

    return {
        name: 'MMO',
        width: width,
        height: height,
        version: '0.7.1',
        map: {
            width: 5000,
            height: 5000
        },
        loop: {
            FPS: 30,
            INTERVAL: 1000/30, // miliseconds
            STEP: (1000/30)/1000 // seconds
        }
    }
}