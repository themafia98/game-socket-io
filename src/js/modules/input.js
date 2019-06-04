export default function input(player,go,settings){

        switch(go){
        case 'down': {
            player.coords.H += player.speed;
            player.position = 'down';
            break;
        }
        case 'up': {
            player.coords.H -= player.speed;
            player.position = 'up';
            break;
        }
        case 'left': {
            player.coords.W -= player.speed;
            player.position = 'left';
            player.currentSprite = settings.spriteMenLeft;
            break;
        }
        case 'right': {
            player.coords.W += player.speed;
            player.position = 'right';
            player.currentSprite = settings.spriteMenRight;
            break;
        }
    }
}