import config from './config';

export default function input(player,go,settings,camera){

    let configs = config();
        switch(go){
        case 'down': {
            player.coords.y += player.speed;
            player.position = 'down';
            break;
        }
        case 'up': {
            player.coords.y -= player.speed;
            player.position = 'up';
            break;
        }
        case 'left': {
            player.coords.x -= player.speed;
            player.position = 'left';
            player.currentSprite = settings.sprite.spriteMenLeft;
            break;
        }
        case 'right': {
            player.coords.x += player.speed;
            player.position = 'right';
            player.currentSprite = settings.sprite.spriteMenRight;
            break;
        }
        default: {
            player.position = 'up';
            break;
        }
    }

    if(player.coords.x - 100 < 0){
        player.coords.x = 100;
    }
    if(player.coords.y - 150 < 0){
        player.coords.y = 150;
    }

    let limit = config().map.limit;

    if(player.coords.x > limit[0]){
        player.coords.x = limit[0]-5;
    }
    if(player.coords.y > limit[1]){
        player.coords.y = limit[1]-5;
    }
}