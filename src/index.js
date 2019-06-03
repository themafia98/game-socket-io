

// STYLE
import './style/main.scss';

// image
import './images/s1.png';
import './images/s2.png';
import './images/hero1.png';

// JavaScript
import main from './js/main.js';
import socketIO from './js/modules/socketClient';
let socket = socketIO();
main(socket);
